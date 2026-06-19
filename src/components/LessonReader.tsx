/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, BookOpen, CheckCircle, ChevronLeft, Volume2, 
  Settings, Maximize2, Minimize2, SkipForward, ArrowRight, Bookmark, 
  X, PenTool, Save, Eye, Sparkles, BookCheck, Info
} from 'lucide-react';
import { Chapter, LessonSegment, UserProgress } from '../types';

interface LessonReaderProps {
  chapters: Chapter[];
  progress: UserProgress;
  onToggleComplete: (chapterId: number, lessonIndex: number) => void;
  onBackToHome: () => void;
  initialChapterId?: number;
  initialLessonIndex?: number;
  onSaveProgress?: (updated: UserProgress) => void;
}

export default function LessonReader({ 
  chapters, 
  progress, 
  onToggleComplete, 
  onBackToHome,
  initialChapterId,
  initialLessonIndex,
  onSaveProgress
}: LessonReaderProps) {
  // Navigation states
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [useAINarration, setUseAINarration] = useState<boolean>(true);
  const [voicingStatus, setVoicingStatus] = useState<string>('Disponível');
  
  // Student notepad state
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Reading visualization states
  const [isReadingExpanded, setIsReadingExpanded] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Handle direct navigation from Hero Banner of specific chapter or lesson index
  useEffect(() => {
    if (initialChapterId) {
      const ch = chapters.find(c => c.id === initialChapterId);
      if (ch) {
        setActiveChapter(ch);
        if (initialLessonIndex !== undefined && initialLessonIndex >= 0 && initialLessonIndex < ch.lessons.length) {
          setActiveLessonIndex(initialLessonIndex);
        } else {
          setActiveLessonIndex(0); // Play first lesson of chapter
        }
      }
    }
  }, [initialChapterId, initialLessonIndex, chapters]);

  // Load notes from localStorage whenever lesson changes
  useEffect(() => {
    if (activeChapter && activeLessonIndex >= 0) {
      setIsPlaying(false);
      setPlaybackTime(0);
      const noteKey = `batalha_notes_${activeChapter.id}_${activeLessonIndex}`;
      const savedNotes = localStorage.getItem(noteKey) || '';
      setStudentNotes(savedNotes);
      setSaveStatus('');
    }
  }, [activeChapter, activeLessonIndex]);

  // Setup/preload synthesizer voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Audio/TTS Speech Synthesis active narration hook
  useEffect(() => {
    if (activeChapter && activeLessonIndex >= 0) {
      const currentLessonItem = activeChapter.lessons[activeLessonIndex];
      
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !currentLessonItem) return;

      if (isPlaying && useAINarration) {
        // Build readable monologue text
        const introText = `${currentLessonItem.title}. `;
        const scriptureText = currentLessonItem.verses && currentLessonItem.verses.length > 0 
          ? `Passagem Chave de ${currentLessonItem.verses[0].reference}: ${currentLessonItem.verses[0].text}. ` 
          : '';
        const coreText = currentLessonItem.content.join(' ');
        const pointsText = currentLessonItem.bulletPoints && currentLessonItem.bulletPoints.length > 0
          ? ` Tópicos essenciais de aprendizado: ${currentLessonItem.bulletPoints.join('. ')}`
          : '';
        const entireText = introText + scriptureText + coreText + pointsText;

        // Cancel other voices running
        window.speechSynthesis.cancel();
        setVoicingStatus('Iniciando...');

        const utterance = new SpeechSynthesisUtterance(entireText);
        utterance.lang = 'pt-BR';
        utterance.rate = playbackSpeed;

        // Select Portuguese/Brazilian system voice if present
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang.toLowerCase().includes('pt'));
        if (ptVoice) {
          utterance.voice = ptVoice;
        }

        utterance.onstart = () => {
          setVoicingStatus(`Narrador IA Ativo (${playbackSpeed}x)`);
        };

        utterance.onboundary = (e) => {
          if (e.name === 'word') {
            const charIndex = e.charIndex;
            const textLen = entireText.length;
            const pct = Math.min(99, Math.round((charIndex / textLen) * 100));
            setPlaybackTime(pct);

            // Throttle saving watcher progress percent up to App level
            if (onSaveProgress) {
              const lessonKey = `${activeChapter.id}_${activeLessonIndex}`;
              const currentProgMap = progress.lessonProgress || {};
              if (!currentProgMap[lessonKey] || Math.abs(currentProgMap[lessonKey] - pct) > 5) {
                onSaveProgress({
                  ...progress,
                  lessonProgress: {
                    ...currentProgMap,
                    [lessonKey]: pct
                  }
                });
              }
            }
          }
        };

        utterance.onend = () => {
          setPlaybackTime(100);
          setIsPlaying(false);
          setVoicingStatus('Finalizado');

          if (onSaveProgress) {
            const lessonKey = `${activeChapter.id}_${activeLessonIndex}`;
            onSaveProgress({
              ...progress,
              completedLessons: progress.completedLessons.includes(lessonKey)
                ? progress.completedLessons
                : [...progress.completedLessons, lessonKey],
              lessonProgress: {
                ...(progress.lessonProgress || {}),
                [lessonKey]: 100
              }
            });
          }
        };

        utterance.onerror = (err) => {
          console.warn('SpeechSynthesis narration warning:', err);
          setVoicingStatus('Narração offline');
        };

        window.speechSynthesis.speak(utterance);
      } else if (!isPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
        setVoicingStatus('Narrador Pausado');
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, useAINarration, activeLessonIndex, activeChapter?.id, playbackSpeed]);

  // Backup simple timer in case voice is disabled or inactive
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !useAINarration && activeLessonIndex >= 0 && activeChapter) {
      setVoicingStatus('Simulador Ativo');
      timer = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            setVoicingStatus('Aula Manual Concluída');
            if (onSaveProgress) {
              const lessonKey = `${activeChapter.id}_${activeLessonIndex}`;
              onSaveProgress({
                ...progress,
                completedLessons: progress.completedLessons.includes(lessonKey)
                  ? progress.completedLessons
                  : [...progress.completedLessons, lessonKey],
                lessonProgress: {
                  ...(progress.lessonProgress || {}),
                  [lessonKey]: 100
                }
              });
            }
            return 100;
          }
          const nextVal = prev + (1.5 * playbackSpeed);
          // periodic save progress
          if (onSaveProgress && Math.round(nextVal) % 15 === 0) {
            const lessonKey = `${activeChapter.id}_${activeLessonIndex}`;
            onSaveProgress({
              ...progress,
              lessonProgress: {
                ...(progress.lessonProgress || {}),
                [lessonKey]: Math.round(nextVal)
              }
            });
          }
          return nextVal;
        });
      }, 400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, useAINarration, activeLessonIndex, playbackSpeed]);

  const saveNotes = () => {
    if (activeChapter && activeLessonIndex >= 0) {
      const noteKey = `batalha_notes_${activeChapter.id}_${activeLessonIndex}`;
      localStorage.setItem(noteKey, studentNotes);
      setSaveStatus('Anotação salva com sucesso!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleLessonSelect = (ch: Chapter, index: number) => {
    setActiveChapter(ch);
    setActiveLessonIndex(index);
  };

  const handleClosePlayer = () => {
    setActiveLessonIndex(-1);
  };

  const currentLesson: LessonSegment | null = 
    activeChapter && activeLessonIndex >= 0 
      ? activeChapter.lessons[activeLessonIndex] 
      : null;

  // Render Lesson Player view
  if (activeChapter && currentLesson && activeLessonIndex >= 0) {
    const lessonKey = `${activeChapter.id}_${activeLessonIndex}`;
    const isCompleted = progress.completedLessons.includes(lessonKey);

    return (
      <div className="min-h-screen bg-neutral-950 text-white pb-12">
        {/* Cinema Mode Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between sticky top-[64px] z-30">
          <button 
            onClick={handleClosePlayer}
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-neutral-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Episódios</span>
          </button>
          
          <div className="text-center">
            <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest leading-none">
              Capítulo {activeChapter.number} • Aula {activeLessonIndex + 1} de {activeChapter.lessons.length}
            </span>
            <h2 className="text-sm font-sans font-bold text-white max-w-sm sm:max-w-md truncate">
              {currentLesson.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(activeChapter.id, activeLessonIndex)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                isCompleted 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                  : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_10px_rgba(220,38,38,0.5)]'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{isCompleted ? 'Concluída ✓' : 'Marcar Concluída'}</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Simulated Video Player Screen & Notes */}
            {!isReadingExpanded && (
              <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* VIDEO LAYER SIMULATOR CONTAINER */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                {/* Visual Cover art */}
                <img 
                  src={activeChapter.thumbnail} 
                  alt={activeChapter.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center filter blur-[1px] brightness-50"
                />

                {/* Glassy tinted screening filter */}
                <div className="absolute inset-0 bg-neutral-950/70"></div>

                {/* P pulsating graphic simulating wave sound */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  {isPlaying ? (
                    <div className="flex items-center gap-1.5 h-16 pointer-events-none">
                      {[1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 5, 2, 3, 4, 1, 3, 2, 4, 1].map((val, idx) => (
                        <motion.div
                          key={idx}
                          className="w-1.5 rounded-full bg-red-650 shadow-[0_0_8px_rgba(229,9,20,0.6)]"
                          animate={{ height: [`${val * 10}%`, `${val * 21}%`, `${val * 10}%`] }}
                          transition={{
                            duration: 0.8 + (idx % 3) * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full border border-neutral-700 bg-neutral-950/80 hover:bg-neutral-950 flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-2xl" onClick={() => setIsPlaying(true)}>
                      <Play className="w-10 h-10 text-red-500 fill-current translate-x-1" />
                    </div>
                  )}
                  <span className="text-xs font-mono font-bold text-neutral-300 tracking-widest uppercase bg-neutral-950/80 px-3 py-1 rounded border border-neutral-800">
                    {voicingStatus}
                  </span>
                </div>

                {/* Cinematic Scripture Subtitle Box */}
                {currentLesson.verses && currentLesson.verses.length > 0 && (
                  <div className="absolute bottom-16 inset-x-4 sm:inset-x-12 text-center bg-neutral-950/85 py-2.5 px-4 rounded border border-neutral-800/80 backdrop-blur-sm">
                    <p className="text-[10px] text-yellow-500 font-mono font-bold uppercase mb-0.5 tracking-wider">
                      Legenda / Versículo {currentLesson.verses[0].reference}
                    </p>
                    <p className="text-xs italic text-neutral-200 leading-normal line-clamp-2">
                      &ldquo;{currentLesson.verses[0].text}&rdquo;
                    </p>
                  </div>
                )}

                {/* MOUNTED DIRECT MEDIA CONTROLS OVERLAY */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent flex flex-col justify-end px-4 pb-2 select-none">
                  
                  {/* Custom Progress bar */}
                  <div className="w-full h-1 bg-neutral-800 rounded-full cursor-pointer relative" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = Math.round((clickX / rect.width) * 100);
                    setPlaybackTime(percent);
                    // Seek support or notify progress
                  }}>
                    <div 
                      className="absolute left-0 h-full bg-red-650 rounded-full shadow-[0_0_6px_rgba(229,9,20,0.8)]" 
                      style={{ width: `${playbackTime}%` }}
                    ></div>
                  </div>

                  {/* Operational control links */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-neutral-300 hover:text-white transition-colors focus:outline-none"
                      >
                        {isPlaying ? (
                          <span className="font-mono text-xs text-red-500 font-bold hover:text-red-400">PAUSA</span>
                        ) : (
                          <span className="font-mono text-xs text-emerald-500 font-bold hover:text-emerald-450">TOCAR</span>
                        )}
                      </button>
                      <div className="flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-neutral-400" />
                        <div className="w-12 h-1 bg-neutral-800 rounded-full">
                          <div className="w-10 h-full bg-neutral-400 rounded-full"></div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Progresso: {Math.round(playbackTime)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* Narrator Mode Selector */}
                      <button 
                        onClick={() => {
                          const nextVal = !useAINarration;
                          setUseAINarration(nextVal);
                          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                          }
                        }}
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                          useAINarration 
                            ? 'bg-red-950/70 text-red-500 border-red-900 hover:bg-red-900/40' 
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
                        }`}
                        title="Alternar voz narradora por inteligência artificial"
                      >
                        {useAINarration ? 'NARRADOR IA: ATIVO' : 'NARRADOR IA: SILENCIOSO'}
                      </button>

                      {/* Speed multiplier */}
                      <button 
                        onClick={() => setPlaybackSpeed(prev => {
                          const next = prev === 1 ? 1.5 : prev === 1.5 ? 2 : prev === 2 ? 0.75 : 1;
                          return next;
                        })}
                        className="text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-700 hover:text-white hover:bg-neutral-800"
                        title="Velocidade de Reprodução"
                      >
                        {playbackSpeed}x
                      </button>
                      <button className="text-neutral-400 hover:text-white transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="text-neutral-400 hover:text-white transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* INTEGRATED COLLABORATIVE STUDY NOTEPAD */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-yellow-500" />
                    <h3 className="text-sm font-sans font-bold text-neutral-200 uppercase tracking-wider">
                      Suas Anotações de Estudo
                    </h3>
                  </div>
                  <button 
                    onClick={saveNotes}
                    className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 px-2.5 py-1 rounded border border-neutral-700 active:scale-95 transition-all font-mono font-bold"
                  >
                    <Save className="w-3.5 h-3.5 text-emerald-400" /> Salvar Notas
                  </button>
                </div>
                {saveStatus && (
                  <p className="text-xs font-mono font-semibold text-emerald-400 mb-2">{saveStatus}</p>
                )}
                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Escreva aqui revelações importantes, orações pessoais ou brechas que você identificou nessa aula para registrar depois..."
                  className="w-full min-h-[120px] bg-neutral-950 border border-neutral-800 rounded p-3 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 font-sans"
                />
              </div>

            </div>
            )}

            {/* RIGHT COLUMN: Rich Formatted Text Content */}
            <div className={`${isReadingExpanded ? 'lg:col-span-12' : 'lg:col-span-5'} flex flex-col gap-6 transition-all duration-300`}>
              
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl max-h-[85vh] overflow-y-auto custom-scroll">
                
                {/* Lesson Header Information & Focus Reading Controllers */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-3 mb-4">
                  <div className="space-y-1">
                    {currentLesson.subtitle && (
                      <span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest block leading-none">
                        {currentLesson.subtitle}
                      </span>
                    )}
                    <h1 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-white m-0">
                      {currentLesson.title}
                    </h1>
                  </div>

                  {/* Reading Focus Controls */}
                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    {/* Font Size controls */}
                    <div className="flex items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-[10px] font-mono font-bold">
                      <span className="text-neutral-500 px-2 select-none border-r border-neutral-800/80">FONTE</span>
                      <button 
                        onClick={() => setFontSize('sm')}
                        className={`px-2 py-1 rounded transition-colors cursor-pointer ${fontSize === 'sm' ? 'bg-red-650 text-white' : 'text-neutral-400 hover:text-white'}`}
                        title="Fonte menor"
                      >
                        A-
                      </button>
                      <button 
                        onClick={() => setFontSize('base')}
                        className={`px-2 py-1 rounded transition-colors cursor-pointer ${fontSize === 'base' ? 'bg-red-650 text-white' : 'text-neutral-400 hover:text-white'}`}
                        title="Fonte padrão"
                      >
                        A
                      </button>
                      <button 
                        onClick={() => setFontSize('lg')}
                        className={`px-2 py-1 rounded transition-colors cursor-pointer ${fontSize === 'lg' ? 'bg-red-650 text-white' : 'text-neutral-400 hover:text-white'}`}
                        title="Fonte maior"
                      >
                        A+
                      </button>
                    </div>

                    {/* Expand/Collapse controller toggle */}
                    <button
                      onClick={() => setIsReadingExpanded(!isReadingExpanded)}
                      className="flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 rounded-lg px-2.5 py-1.5 transition-all active:scale-95 cursor-pointer"
                      title={isReadingExpanded ? "Visualização padrão dividida" : "Visualizar em foco estendido"}
                    >
                      {isReadingExpanded ? (
                        <>
                          <Minimize2 className="w-3.5 h-3.5 text-red-500" />
                          <span>Reduzir</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-3.5 h-3.5 text-red-500" />
                          <span>Foco</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* SCRIPTURES BOX (VERSES) */}
                {currentLesson.verses && currentLesson.verses.length > 0 && (
                  <div className="bg-red-950/20 border-l-4 border-red-700 p-4 rounded-r mb-6 shadow-sm">
                    <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Escritura Chave
                    </h4>
                    {currentLesson.verses.map((v, i) => (
                      <div key={i} className="mb-2 last:mb-0">
                        <p className="text-xs italic text-neutral-200">
                          &ldquo;{v.text}&rdquo;
                        </p>
                        <span className="text-[10px] font-mono text-yellow-500 font-semibold uppercase">
                          — {v.reference}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* TEXT CONTENT BODY */}
                <div className={`space-y-4 text-justify leading-relaxed font-sans ${
                  fontSize === 'sm' ? 'text-xs text-neutral-300' :
                  fontSize === 'lg' ? 'text-base sm:text-lg text-neutral-200 font-medium' :
                  'text-sm text-neutral-300'
                }`}>
                  {currentLesson.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* BULLETPOINTS (TÓPICOS PRINCIPAIS) */}
                {currentLesson.bulletPoints && currentLesson.bulletPoints.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <BookCheck className="w-4 h-4 text-red-500" /> Tópicos Principais
                    </h4>
                    <ul className="space-y-2.5">
                      {currentLesson.bulletPoints.map((bp, i) => (
                        <li key={i} className="text-neutral-300 text-xs flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2"></span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* TEACHER TIPS (DICAS DE AUTORIDADE) */}
                {currentLesson.tips && currentLesson.tips.length > 0 && (
                  <div className="mt-6 bg-yellow-950/20 border border-yellow-800/40 p-4 rounded-lg">
                    <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4" /> Diretriz do Guerreiro
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                      {currentLesson.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-yellow-500">★</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation inside player */}
                <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    {activeLessonIndex > 0 && (
                      <button 
                        onClick={() => setActiveLessonIndex(prev => prev - 1)}
                        className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        ← Anterior
                      </button>
                    )}
                  </div>

                  <div>
                    {activeLessonIndex < activeChapter.lessons.length - 1 ? (
                      <button 
                        onClick={() => setActiveLessonIndex(prev => prev + 1)}
                        className="text-xs font-mono text-red-500 hover:text-white font-bold transition-all flex items-center gap-1.5"
                      >
                        Próxima aula <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={handleClosePlayer}
                        className="text-xs font-mono text-emerald-500 hover:text-white font-bold transition-all flex items-center gap-1.5"
                      >
                        Capítulo Finalizado <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }

  // Render Episode List of selected chapters
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-neutral-200">
      
      {/* Return to home screen */}
      <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-red-500" />
          <h1 className="text-xl sm:text-2xl font-sans font-black tracking-tight uppercase">
            Módulos do Curso
          </h1>
        </div>
        <button
          onClick={onBackToHome}
          className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          ← Voltar para Destaques
        </button>
      </div>

      <div className="space-y-12">
        {chapters.map((chapter) => {
          const isSelected = activeChapter?.id === chapter.id;

          return (
            <div 
              key={chapter.id} 
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg transition-all hover:border-neutral-700"
            >
              {/* Module Header Bar */}
              <div 
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4 cursor-pointer hover:bg-neutral-900/55"
                onClick={() => setActiveChapter(isSelected ? null : chapter)}
              >
                <div className="flex items-start gap-4">
                  {/* Aspect Thumbnail Box */}
                  <div className="relative w-24 sm:w-32 aspect-video bg-neutral-950 rounded overflow-hidden shrink-0 shadow-inner">
                    <img 
                      src={chapter.thumbnail} 
                      alt={chapter.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-neutral-950/20"></div>
                    <div className="absolute bottom-1 right-1 bg-red-600/90 text-white font-mono text-[9px] font-bold px-1 py-0.5 rounded leading-none">
                      CAP {chapter.number}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-widest">
                      Capítulo {chapter.number} de {chapters.length}
                    </span>
                    <h2 className="text-base sm:text-lg font-sans font-black tracking-tight text-white uppercase group-hover:text-red-500 transition-colors">
                      {chapter.title}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 max-w-2xl text-justify font-sans">
                      {chapter.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-xs font-mono text-neutral-400">
                    {chapter.lessons.length} Aulas
                  </span>
                  <button className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-mono font-bold px-3.5 py-2 border border-neutral-700 rounded transition-all">
                    {isSelected ? 'Ocultar' : 'Expandir Aulas'}
                  </button>
                </div>
              </div>

              {/* expanded lesson items list */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-neutral-800 bg-neutral-950/40"
                  >
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {chapter.lessons.map((lesson, index) => {
                        const lKey = `${chapter.id}_${index}`;
                        const isLessonCompleted = progress.completedLessons.includes(lKey);
                        
                        return (
                          <div 
                            key={index}
                            onClick={() => handleLessonSelect(chapter, index)}
                            className="bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 p-4 rounded-lg flex items-center justify-between gap-4 cursor-pointer transition-all hover:-translate-y-0.5"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-800/60">
                                <span className="font-mono text-xs text-red-500 font-bold">
                                  0{index + 1}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <h3 className="text-xs sm:text-sm font-sans font-bold text-white leading-tight">
                                  {lesson.title}
                                </h3>
                                {lesson.subtitle && (
                                  <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">
                                    {lesson.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-2">
                              {isLessonCompleted ? (
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Play className="w-4 h-4 text-red-500 hover:text-red-400 transition-colors shrink-0" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
