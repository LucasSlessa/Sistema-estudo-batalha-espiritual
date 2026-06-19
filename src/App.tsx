/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import LessonReader from './components/LessonReader';
import BodyMapUnction from './components/BodyMapUnction';
import DiagnosticForm from './components/DiagnosticForm';
import ExerciseQuiz from './components/ExerciseQuiz';
import AnneliseStory from './components/AnneliseStory';
import { courseChapters } from './data/courseData';
import { courseExercises } from './data/exerciseData';
import { UserProgress } from './types';
import { 
  Play, BookOpen, Activity, PenTool, Flame, ArrowRight, 
  ShieldAlert, BookOpenCheck, ClipboardCheck, Sparkles, Trophy
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [selectedInitialChapterId, setSelectedInitialChapterId] = useState<number | undefined>(undefined);
  const [selectedInitialLessonIndex, setSelectedInitialLessonIndex] = useState<number | undefined>(undefined);
  const modulesScrollRef = React.useRef<HTMLDivElement>(null);
  const watchedScrollRef = React.useRef<HTMLDivElement>(null);
  
  // Master persistent state initialized from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('batalha_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Falha carregando progresso do aluno', e);
      }
    }
    return {
      theme: 'dark',
      completedLessons: [],
      bookmarkedChapters: [],
      quizAnswers: {}
    };
  });

  // Calculate total catalog lessons
  const totalLessons = courseChapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  // Scroll sideways slider helper
  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get user watch history list
  const getWatchedLessons = () => {
    const list: Array<{
      chapterId: number;
      lessonIndex: number;
      chapterNumber: number;
      lessonTitle: string;
      chapterTitle: string;
      thumbnail: string;
      progressPercent: number;
    }> = [];

    const progressMap = (progress.lessonProgress || {}) as Record<string, number>;
    Object.entries(progressMap).forEach(([key, pct]) => {
      const parts = key.split('_');
      if (parts.length === 2) {
        const chId = parseInt(parts[0], 10);
        const lIdx = parseInt(parts[1], 10);
        const ch = courseChapters.find(c => c.id === chId);
        if (ch && ch.lessons[lIdx]) {
          list.push({
            chapterId: chId,
            lessonIndex: lIdx,
            chapterNumber: ch.number,
            lessonTitle: ch.lessons[lIdx].title,
            chapterTitle: ch.title,
            thumbnail: ch.thumbnail,
            progressPercent: pct
          });
        }
      }
    });

    const completedKeys = progress.completedLessons || [];
    completedKeys.forEach(key => {
      const parts = key.split('_');
      if (parts.length === 2) {
        const chId = parseInt(parts[0], 10);
        const lIdx = parseInt(parts[1], 10);
        const exists = list.some(item => item.chapterId === chId && item.lessonIndex === lIdx);
        if (!exists) {
          const ch = courseChapters.find(c => c.id === chId);
          if (ch && ch.lessons[lIdx]) {
            list.push({
              chapterId: chId,
              lessonIndex: lIdx,
              chapterNumber: ch.number,
              lessonTitle: ch.lessons[lIdx].title,
              chapterTitle: ch.title,
              thumbnail: ch.thumbnail,
              progressPercent: 100
            });
          }
        }
      }
    });

    return list.sort((a, b) => a.chapterId - b.chapterId || a.lessonIndex - b.lessonIndex);
  };

  // Sync state changes with localStorage
  const saveProgressState = (updated: UserProgress) => {
    setProgress(updated);
    localStorage.setItem('batalha_progress', JSON.stringify(updated));
  };

  const handleToggleComplete = (chapterId: number, lessonIndex: number) => {
    const key = `${chapterId}_${lessonIndex}`;
    const completed = [...progress.completedLessons];
    const isCompleted = completed.includes(key);

    let updatedCompleted;
    if (isCompleted) {
      updatedCompleted = completed.filter(k => k !== key);
    } else {
      updatedCompleted = [...completed, key];
    }

    saveProgressState({
      ...progress,
      completedLessons: updatedCompleted
    });
  };

  // Triggered from playable banners or watched history items
  const handleStartStudy = (chId?: number, lessonIdx?: number) => {
    setSelectedInitialChapterId(chId || 1);
    setSelectedInitialLessonIndex(lessonIdx);
    setCurrentTab('modulos');
  };

  // Specialized renunciation prayers from Pages 37-39 of the PDF (non-body specific)
  const renunciaPrayersList = [
    {
      id: 'catolicismo',
      title: 'Renúncia ao Catolicismo Romano',
      desc: 'Anula batismos idólatras, orações a santos e rituais consanguíneos herdados dos pais.',
      prayer: 'Renuncio a todo o meu envolvimento no Catolicismo; renuncio ao meu batismo na Igreja Católica e renuncio qualquer vinculação de meu nome a qualquer santo católico, desligando espiritualmente esta vinculação; renuncio a minha crisma, catecismo, 1ª comunhão, assistência a missas, hóstias, procissões, imagens, velas. Peço perdão pelo pecado de idolatria e cancelo toda veneração e adoração que dei aos santos católicos. Coloco ainda o sangue de Jesus Cristo e o poder da sua crucificação entre a minha vida e todas as maldições que vieram sobre mim em decorrência desses pecados. Renuncio a todas as velas que acendi para as almas, para anjos da guarda, para mim mesmo, velas de 7 dias; peço perdão por esses pecados, e desligo, em nome de Jesus, todo seu efeito espiritual sobre a minha vida e minha descendência.'
    },
    {
      id: 'espiritismo',
      title: 'Renúncia ao Espiritismo e Linhagem Africana',
      desc: 'Quebra alianças ocultas de passe de mãos, incorporação de espíritos e consultas a médiuns.',
      prayer: 'Renuncio a todo o meu envolvimento com Kardecismo, Umbanda, Candomblé, Quimbanda, Orederê, Canjerê, Kundelê, Omolokó, Magia Negra e outras linhas da feitiçaria, da macumbaria e do uso de poderes mágicos e ocultos. Em nome de Jesus, renuncio a todas as consagrações que fiz da minha pessoa a quaisquer entidades, e desfaço, espiritualmente, todo pacto com Satanás e seus demônios sobre a minha vida e dos meus descendentes, em decorrência destas consagrações. Renuncio a todos os atos que me comprometeram com qualquer entidade, e atos que invocaram qualquer espírito. Renuncio a todos os rituais que pratiquei, tudo que comi ou bebi em oferecimento às entidades, cantigas que entoei ou giras de incorporação.'
    },
    {
      id: 'reconceito',
      title: 'Renúncia a Seitas e Filosofias Ocultas',
      desc: 'Desliga mantras orientais, práticas de regressão de vidas passadas e orações secretas de templos.',
      prayer: 'Renuncio a todas as seitas com que me envolvi. Renuncio a todos os sacrifícios, rezas, incensos, mantras, venerações, adorações e invocações que fiz nestas seitas, assim como tudo que eu comi e bebi. Desligo todo efeito espiritual destes atos sobre a minha vida e dos meus descendentes. Peço ao Senhor Jesus que envie os Seus anjos até os locais destas seitas que frequentei, e coloque o sangue de Jesus sobre o meu nome nos registros existentes, desligando espiritualmente qualquer vinculação minha com estas seitas. Peço ainda perdão por ter contribuído financeiramente com estas seitas, e por ter envolvido outras pessoas, e as abençoo e as libero de tais cadeias. Em nome de Jesus, amém.'
    },
    {
      id: 'maconaria',
      title: 'Renúncia à Maçonaria e Pactos Secretos',
      desc: 'Quebra terríveis juramentos consanguíneos que trazem miséria, ruína financeira e divórcio.',
      prayer: 'No nome do Senhor Jesus Cristo, e pela autoridade que possuo como crente nEle, declaro-me redimido da mão do diabo. Pelo sangue de Jesus, foram perdoados todos os meus pecados. O sangue de Jesus me purifica. No nome de Jesus, confesso agora que tenho sido culpado do pecado de idolatria na Loja Maçônica. Concordando com o Senhor, chamo este envolvimento de pecado, e peço-Lhe para removê-lo completamente de minha vida e de meus familiares. Repreendo todos os espíritos mentirosos, enganadores, da Franco-Maçonaria. Peço ao Senhor para purificar, com Seu sangue, qualquer possível pecado relacionado a estes juramentos até a 10ª geração.'
    },
    {
      id: 'novael',
      title: 'Renúncia à Nova Era e Astrologia',
      desc: 'Quebra marcas mentais de poder da mente, leitura de búzios e dependência do mapa astral.',
      prayer: 'Em nome de Jesus, eu tomo posse da Espada de Glória, que vem diretamente do Trono de Deus, e quebro, desfaço, toda conexão e toda ligação de qualquer ser maligno para com a minha vida. Retiro toda maldade colocada no meu coração, e desfaço a camada de gelo que está sobre ele. Peço ao Senhor Jesus que restaure o meu coração, e me dê um coração de carne e bondade. Desfaço, em nome de Jesus, a marca na minha testa, na minha mente, e queimo o local com o sangue de Jesus, restaurando a minha mente. Desfaço a marca colocada no meu ouvido esquerdo, e na palma da minha mão direita, declarando que sou livre para louvar ao Único Deus verdadeiro. Em nome de Jesus, amém!'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans select-none antialiased">
      {/* Dynamic Nav-link Bar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedInitialChapterId(undefined); // Clear specific chapter focus
        }}
        progress={progress}
        totalLessons={totalLessons}
      />

      <main className="flex-grow">
        {/* VIEW A: HOME DASHBOARD SECTION */}
        {currentTab === 'inicio' && (
          <div className="flex flex-col gap-8 pb-16">
            
            {/* Immersive featured hero banner */}
            <HeroBanner 
              progress={progress}
              onPlayClick={() => handleStartStudy()}
              onDiagnosticoClick={() => setCurrentTab('diagnostico')}
              onAnneliseClick={() => setCurrentTab('annelise_case')}
            />

            {/* Sliding Row 0: Continuar Assistindo (Netflix watch history list) */}
            {(() => {
              const watched = getWatchedLessons();
              if (watched.length === 0) return null;
              return (
                <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-4">
                  <div className="flex items-center justify-between border-l-4 border-red-650 pl-3">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                      <h2 className="text-base sm:text-lg font-sans font-black text-white uppercase tracking-tight">
                        Continuar Assistindo
                      </h2>
                    </div>
                    
                    {/* Navigation controllers */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => scrollContainer(watchedScrollRef, 'left')}
                        className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white p-2.5 rounded transition-all active:scale-95 text-xs font-bold font-mono tracking-tight cursor-pointer"
                        title="Retroceder"
                      >
                        &larr;
                      </button>
                      <button 
                        onClick={() => scrollContainer(watchedScrollRef, 'right')}
                        className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white p-2.5 rounded transition-all active:scale-95 text-xs font-bold font-mono tracking-tight cursor-pointer"
                        title="Avançar"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>

                  <div 
                    ref={watchedScrollRef}
                    className="flex overflow-x-auto gap-6 mt-1 pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent scroll-smooth snap-x snap-mandatory"
                  >
                    {watched.map((item, idx) => (
                      <div 
                        key={`${item.chapterId}_${item.lessonIndex}_${idx}`}
                        className="w-[260px] sm:w-[295px] shrink-0 snap-start bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col shadow-md hover:border-neutral-700 transition-all duration-300 relative group"
                      >
                        <div className="relative aspect-video bg-neutral-950">
                          <img 
                            src={item.thumbnail} 
                            alt={item.lessonTitle}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center brightness-60 group-hover:brightness-40 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                          
                          {/* Play button hover state */}
                          <div 
                            onClick={() => handleStartStudy(item.chapterId, item.lessonIndex)}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-300"
                          >
                            <div className="w-11 h-11 rounded-full bg-red-650 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                              <Play className="w-5 h-5 fill-current translate-x-0.5" />
                            </div>
                          </div>

                          <span className="absolute bottom-2 left-2 bg-neutral-950/80 text-neutral-300 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded leading-none uppercase">
                            Fascículo {item.chapterNumber} • Aula {item.lessonIndex + 1}
                          </span>
                        </div>

                        <div className="p-3.5 flex flex-col gap-1 flex-grow">
                          <h3 className="text-xs font-sans font-black text-white tracking-tight uppercase truncate">
                            {item.lessonTitle}
                          </h3>
                          <p className="text-[10px] text-neutral-500 font-sans truncate uppercase tracking-tight">
                            {item.chapterTitle}
                          </p>

                          {/* Red visual progression line */}
                          <div className="w-full h-1 bg-neutral-800 rounded-full mt-2 relative overflow-hidden">
                            <div 
                              className="absolute left-0 h-full bg-red-650 rounded-full" 
                              style={{ width: `${item.progressPercent}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-neutral-500">
                            <span>{item.progressPercent}% concluído</span>
                            <span className="text-[8px] text-red-500 font-bold uppercase transition-transform group-hover:translate-x-1 cursor-pointer" onClick={() => handleStartStudy(item.chapterId, item.lessonIndex)}>
                              Retomar &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Sliding Row 1: Módulos do Curso (Chapters) */}
            <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-4">
              <div className="flex items-center justify-between border-l-4 border-red-650 pl-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-500" />
                  <h2 className="text-base sm:text-lg font-sans font-black text-white uppercase tracking-tight">
                    Módulos de Estudo
                  </h2>
                </div>

                {/* Left/Right Buttons for Módulos row */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollContainer(modulesScrollRef, 'left')}
                    className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white p-2.5 rounded transition-all active:scale-95 text-xs font-bold font-mono tracking-tight cursor-pointer"
                    title="Retroceder"
                  >
                    &larr;
                  </button>
                  <button 
                    onClick={() => scrollContainer(modulesScrollRef, 'right')}
                    className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white p-2.5 rounded transition-all active:scale-95 text-xs font-bold font-mono tracking-tight cursor-pointer"
                    title="Avançar"
                  >
                    &rarr;
                  </button>
                </div>
              </div>

              <div 
                ref={modulesScrollRef}
                className="flex overflow-x-auto gap-6 mt-1 pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent scroll-smooth snap-x snap-mandatory"
              >
                {courseChapters.map((ch) => (
                  <div 
                    key={ch.id}
                    className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col shadow-md hover:border-neutral-700 transition-all duration-350"
                  >
                    <div className="relative aspect-video bg-neutral-950">
                      <img 
                        src={ch.thumbnail} 
                        alt={ch.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center brightness-90 saturate-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 bg-red-650 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                        FASCÍCULO {ch.number}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-1.5 flex-grow">
                      <h3 className="text-sm font-sans font-black text-white tracking-tight uppercase line-clamp-1">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans line-clamp-2 text-justify">
                        {ch.summary}
                      </p>
                      
                      <button
                        onClick={() => handleStartStudy(ch.id)}
                        className="flex items-center justify-center gap-1.5 mt-auto pt-3 border-t border-neutral-800 font-mono text-[10px] font-bold text-red-500 hover:text-white transition-colors cursor-pointer"
                      >
                        Estudar Fase <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sliding Row 2: Manuais de Intervenção Prática (Prayers, Cases) */}
            <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2 border-l-4 border-red-650 pl-3">
                <Activity className="w-5 h-5 text-red-500" />
                <h2 className="text-base sm:text-lg font-sans font-black text-white uppercase tracking-tight">
                  Manuais e Sessões Práticas
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
                
                {/* Visual Card 1: Interactive Human Unction */}
                <div className="group bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex flex-col gap-3 shadow-md hover:border-neutral-700 transition-all overflow-hidden">
                  <div className="h-32 w-full bg-neutral-950 relative overflow-hidden -mt-5 -mx-5 mb-2 rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=640" 
                      alt="Unção"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-60 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                  </div>
                  <span className="text-[10px] text-yellow-500 uppercase font-mono font-bold leading-none">Unção com Óleo</span>
                  <h3 className="text-sm font-sans font-black text-white uppercase">Mapeamento de Unção Corporal</h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed text-justify">
                    Acessee o modelo de unção interativa por partes do corpo. Aplique o óleo nas áreas e recite orações para cada órgão vital (Coração, Olhos, Rins, Pés).
                  </p>
                  <button 
                    onClick={() => setCurrentTab('praticas')}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-mono text-[10px] font-bold uppercase rounded py-2 text-center mt-auto cursor-pointer"
                  >
                    Abrir Mapa Corporal
                  </button>
                </div>

                {/* Visual Card 2: Questionario Anexo 3 */}
                <div className="group bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex flex-col gap-3 shadow-md hover:border-neutral-700 transition-all border-b-4 border-b-red-650 overflow-hidden">
                  <div className="h-32 w-full bg-neutral-950 relative overflow-hidden -mt-5 -mx-5 mb-2 rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=640" 
                      alt="Diagnóstico"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-60 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                  </div>
                  <span className="text-[10px] text-red-500 uppercase font-mono font-bold leading-none">Auto-Questionário</span>
                  <h3 className="text-sm font-sans font-black text-white uppercase">Diagnóstico Clínico Espiritual</h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed text-justify">
                    Preencha o levantamento detalhado das heranças, seitas ou sentimentos crônicos em sua história consanguínea e obtenha um roteiro de orações correspondentes.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('diagnostico')}
                    className="bg-red-650 hover:bg-red-500 text-white font-mono text-[10px] font-bold uppercase rounded py-2 text-center mt-auto cursor-pointer shadow-[0_0_8px_rgba(220,38,38,0.4)]"
                  >
                    Fazer Diagnóstico
                  </button>
                </div>

                {/* Visual Card 3: True Case study File */}
                <div className="group bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex flex-col gap-3 shadow-md hover:border-neutral-700 transition-all overflow-hidden">
                  <div className="h-32 w-full bg-neutral-950 relative overflow-hidden -mt-5 -mx-5 mb-2 rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=640" 
                      alt="Histórico"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-60 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                  </div>
                  <span className="text-[10px] text-neutral-500 uppercase font-mono font-bold leading-none">Base Histórica</span>
                  <h3 className="text-sm font-sans font-black text-white uppercase">O Caso de Annelise Michel</h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed text-justify">
                    Estude o relato histórico oficial das 67 sessões do Grande Exorcismo ocorrido na Alemanha Ocidental que inspirou o cinema de suspense.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('annelise_case')}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-mono text-[10px] font-bold uppercase rounded py-2 text-center mt-auto cursor-pointer"
                  >
                    Detalhar Ficha do Caso
                  </button>
                </div>

              </div>
            </div>

            {/* Sliding Row 3: Quizzes de Revisão */}
            <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2 border-l-4 border-red-650 pl-3">
                <Trophy className="w-5 h-5 text-red-500" />
                <h2 className="text-base sm:text-lg font-sans font-black text-white uppercase tracking-tight">
                  Quizzes de Fixação
                </h2>
              </div>
              
              <ExerciseQuiz 
                exerciseGroups={courseExercises}
                progress={progress}
                onSaveProgress={saveProgressState}
              />
            </div>

          </div>
        )}

        {/* VIEW B: FULL COURSE MODULE CATALOG (AULAS) SCREEN */}
        {currentTab === 'modulos' && (
          <div className="pb-16 animate-fadeIn">
            <LessonReader 
              chapters={courseChapters}
              progress={progress}
              onToggleComplete={handleToggleComplete}
              onBackToHome={() => setCurrentTab('inicio')}
              initialChapterId={selectedInitialChapterId}
              initialLessonIndex={selectedInitialLessonIndex}
              onSaveProgress={saveProgressState}
            />
          </div>
        )}

        {/* VIEW C: PRACTICES, DETAILED REMUNCIATION PRAYERS LIBRARY & BODY MAP SCREEN */}
        {currentTab === 'praticas' && (
          <div className="pb-16 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Interactive map of oil unction */}
            <BodyMapUnction />

            {/* EXPANDABLE RENUNCIATION PRAYER SYSTEM BLOCK (Page 37-39) */}
            <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-xl">
              <div className="border-b border-neutral-800 pb-3 mb-6">
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Flame className="w-4 h-4 text-red-500" /> ANEXO 2 • SÉRIE ADICIONAL
                </span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-white uppercase mt-1">
                  Biblioteca de Orações de Renúncia
                </h2>
                <p className="text-xs text-neutral-400 font-sans tracking-tight mt-1 leading-normal text-justify">
                  Abaixo estão os modelos literais exatos do Manual de Quebra de Maldições do CFAP. 
                  Respire fundo, recolha-se em silêncio e ministre verbalmente cada sentença com fé profunda e firmeza de convicção.
                </p>
              </div>

              <div className="space-y-4">
                {renunciaPrayersList.map((item) => (
                  <details 
                    key={item.id}
                    className="group bg-neutral-950 border border-neutral-800/80 rounded-lg p-5 transition-all text-justify"
                  >
                    <summary className="list-none flex items-center justify-between font-sans text-sm font-black text-white uppercase cursor-pointer select-none">
                      <div className="flex flex-col gap-0.5 max-w-[85%]">
                        <span>{item.title}</span>
                        <span className="text-[10px] text-neutral-500 font-mono font-medium lowercase first-letter:uppercase">{item.desc}</span>
                      </div>
                      <span className="text-red-500 font-mono text-xs transition-transform group-open:rotate-90 select-none">▶</span>
                    </summary>
                    <div className="mt-4 border-t border-neutral-800 pt-4 leading-relaxed font-sans text-xs sm:text-sm text-neutral-300 italic select-text">
                      &ldquo;{item.prayer}&rdquo;
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW D: COMPLEX DIAGNOSTIC AND GENERAL FORM SCREEN */}
        {currentTab === 'diagnostico' && (
          <div className="pb-16 animate-fadeIn">
            <DiagnosticForm 
              progress={progress}
              onSaveProgress={saveProgressState}
            />
          </div>
        )}

        {/* VIEW E: ANNELISE DOCUMENTARY CASE SCREEN */}
        {currentTab === 'annelise_case' && (
          <div className="pb-16 animate-fadeIn">
            <AnneliseStory 
              onBackToHome={() => setCurrentTab('inicio')}
            />
          </div>
        )}

      </main>

      {/* Styled Responsive Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-8 text-center text-[10px] sm:text-xs text-neutral-600 font-mono w-full select-none mt-auto">
        <p>BATALHA ESPIRITUAL • PORTAL COMPLETO DE CURSOS E EXERCÍCIOS</p>
        <p className="mt-1 text-[10px] text-neutral-700">© CFAP - SARA NOSSA TERRA | SUÍTE INSPIRADA NA ESTÉTICA NETFLIX</p>
      </footer>
    </div>
  );
}

