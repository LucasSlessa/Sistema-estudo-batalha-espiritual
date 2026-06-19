/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Award, CheckCircle, XCircle, ChevronLeft, 
  HelpCircle, Eye, Sparkles, BookOpen, AlertCircle
} from 'lucide-react';
import { ExerciseGroup, Question, UserProgress } from '../types';
import theologyManual from '../assets/images/theology_manual_1781826901454.jpg';
import doctrinesManual from '../assets/images/doctrines_manual_1781826911469.jpg';
import deliverancePrayers from '../assets/images/deliverance_prayers_1781826920049.jpg';

interface ExerciseQuizProps {
  exerciseGroups: ExerciseGroup[];
  progress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
}

export default function ExerciseQuiz({ exerciseGroups, progress, onSaveProgress }: ExerciseQuizProps) {
  const [selectedGroup, setSelectedGroup] = useState<ExerciseGroup | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [textResponse, setTextResponse] = useState<string>('');
  const [showAnswer, setShowReport] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const startQuiz = (group: ExerciseGroup) => {
    setSelectedGroup(group);
    setCurrentQuestionIdx(0);
    setSelectedChoice('');
    setTextResponse('');
    setShowReport(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const currentQuestion: Question | null = 
    selectedGroup ? selectedGroup.questions[currentQuestionIdx] : null;

  const handleChoiceSubmit = (choice: string) => {
    if (!currentQuestion) return;
    setSelectedChoice(choice);
    setShowReport(true);
    
    const isCorrect = choice === currentQuestion.correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    // Save answer in progress history
    const ansKey = `${selectedGroup!.id}_${currentQuestion.id}`;
    const updatedAnswers = { ...progress.quizAnswers, [ansKey]: { answer: choice, isCorrectStory: isCorrect } };
    onSaveProgress({ ...progress, quizAnswers: updatedAnswers });
  };

  const handleTextSubmit = (isSelfRatedCorrect: boolean) => {
    if (!currentQuestion) return;
    setShowReport(true);

    if (isSelfRatedCorrect) {
      setQuizScore(prev => prev + 1);
    }

    const ansKey = `${selectedGroup!.id}_${currentQuestion.id}`;
    const updatedAnswers = { 
      ...progress.quizAnswers, 
      [ansKey]: { answer: textResponse, isCorrectStory: isSelfRatedCorrect } 
    };
    onSaveProgress({ ...progress, quizAnswers: updatedAnswers });

    // Progress to next
    handleAdvance();
  };

  const handleAdvance = () => {
    if (!selectedGroup) return;
    if (currentQuestionIdx < selectedGroup.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedChoice('');
      setTextResponse('');
      setShowReport(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleBackToSelection = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-neutral-200">
      
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: QUIZ GAMEPLAY IN ACTION */}
        {selectedGroup && currentQuestion && !quizFinished ? (
          <motion.div 
            key="gameplay"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl relative"
          >
            {/* Gameplay Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
              <button
                onClick={handleBackToSelection}
                className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" /> Cancelar
              </button>
              
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                Questão {currentQuestionIdx + 1} de {selectedGroup.questions.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="flex items-start gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
              <h2 className="text-base sm:text-lg font-sans font-black tracking-tight text-white uppercase leading-normal">
                {currentQuestion.questionText}
              </h2>
            </div>

            {/* QUESTION CASE A: MULTIPLE SELECT CHOICE TYPE */}
            {currentQuestion.type === 'choice' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, idx) => {
                  const isChecked = selectedChoice === option;
                  const isCorrectAnswer = option === currentQuestion.correctAnswer;
                  const hasSubmitted = showAnswer;

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmitted}
                      onClick={() => handleChoiceSubmit(option)}
                      className={`w-full text-justify p-4 rounded-lg border text-sm transition-all focus:outline-none flex gap-3 text-neutral-200 ${
                        hasSubmitted
                          ? isCorrectAnswer
                            ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                            : isChecked
                              ? 'bg-red-950/40 border-red-500 shadow-[0_0_8px_rgba(220,185,129,0.2)] font-semibold'
                              : 'bg-neutral-950/20 border-neutral-800/80 opacity-50'
                          : 'bg-neutral-950 hover:bg-neutral-950/80 border-neutral-800 hover:border-neutral-700 cursor-pointer active:scale-[0.99]'
                      }`}
                    >
                      <span className="font-mono text-xs text-neutral-500 font-bold leading-none mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* QUESTION CASE B: FREE FORM TEXT WRITE-IN TYPE WITH REFLECTION */}
            {currentQuestion.type === 'text' && !showAnswer && (
              <div className="flex flex-col gap-4">
                <textarea
                  value={textResponse}
                  onChange={(e) => setTextResponse(e.target.value)}
                  placeholder="Responda detalhadamente com suas palavras baseando-se no conteúdo estudado..."
                  className="w-full min-h-[140px] bg-neutral-950 border border-neutral-800 rounded p-4 text-sm text-neutral-200 placeholder-neutral-700 focus:outline-none focus:border-neutral-700 font-sans"
                />
                
                <button
                  disabled={!textResponse.trim()}
                  onClick={() => setShowReport(true)}
                  className="bg-red-600 hover:bg-red-500 disabled:opacity-45 text-white text-xs font-mono font-bold uppercase tracking-wider py-3 rounded active:scale-95 transition-all text-center"
                >
                  Exibir Resposta Recomendada
                </button>
              </div>
            )}

            {/* TEXT CASE SECOND PHASE: SHOW IDEAL ANSWER TO COMPARE */}
            {currentQuestion.type === 'text' && showAnswer && (
              <div className="flex flex-col gap-6 mt-4">
                
                {/* Comparison Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-950 border border-neutral-800 p-4 rounded">
                    <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-wider">Sua Resposta:</span>
                    <p className="text-xs text-neutral-300 italic mt-1 leading-relaxed text-justify">&ldquo;{textResponse}&rdquo;</p>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-800 p-4 rounded">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Gabarito Recomendado:</span>
                    <p className="text-xs text-neutral-200 font-sans mt-1 leading-relaxed text-justify">&ldquo;{currentQuestion.idealAnswer || 'A essência da resposta reside na sinceridade e concordância integral com as escrituras sagradas.'}&rdquo;</p>
                  </div>
                </div>

                {/* Self rate checklist */}
                <div className="bg-neutral-950 p-4 rounded border border-neutral-800 flex flex-col items-center gap-3 text-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-300">Avalie sua Resposta sincera:</h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTextSubmit(false)}
                      className="text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white px-3.5 py-1.5 rounded"
                    >
                      Não respondi correto
                    </button>
                    <button
                      onClick={() => handleTextSubmit(true)}
                      className="text-xs font-mono bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-1.5 rounded"
                    >
                      Acertei o conceito principal!
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* CHOICE SUBMIT REPORT FEEDBACK */}
            {currentQuestion.type === 'choice' && showAnswer && (
              <div className="mt-6 border-t border-neutral-800 pt-5 flex flex-col gap-4">
                <div className="flex items-start gap-2.5">
                  {selectedChoice === currentQuestion.correctAnswer ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-sans font-bold uppercase">
                      <CheckCircle className="w-5 h-5 text-emerald-500" /> Resposta Correta!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm font-sans font-bold uppercase">
                      <XCircle className="w-5 h-5 text-red-500" /> Resposta Incorreta!
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAdvance}
                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider active:scale-95 transition-all text-center cursor-pointer"
                >
                  Continuar Desafio ✓
                </button>
              </div>
            )}

          </motion.div>
        ) : selectedGroup && quizFinished ? (
          /* VIEW 2: FINAL SCORE CARD SCREEN AT END OF QUIZ */
          <motion.div 
            key="scorecard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-md mx-auto shadow-2xl text-center flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center p-3 shadow-inner">
              <Trophy className="w-10 h-10 text-yellow-500 animate-bounce" />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest leading-none">
                Gabarito Registrado
              </span>
              <h2 className="text-xl font-sans font-black text-white mt-1 uppercase">
                Exercício Concluído!
              </h2>
            </div>

            <div className="my-2 bg-neutral-950/60 w-full py-4 px-6 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-500 font-mono block">Acertos do Aluno:</span>
              <span className="text-3xl font-mono font-black text-red-500 block mt-1">
                {quizScore} de {selectedGroup.questions.length}
              </span>
              <span className="text-[10px] text-neutral-400 font-sans block mt-1">
                Aproveitamento de {Math.round((quizScore / selectedGroup.questions.length) * 100)}%
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xs mb-2">
              Seu progresso de acertos foi gravado com sucesso. Siga para as próximas aulas ou revise os temas caso queira atingir 100%!
            </p>

            <button
              onClick={handleBackToSelection}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-wider py-2.5 px-6 rounded active:scale-95 transition-all text-center w-full"
            >
              Concluir e Voltar
            </button>
          </motion.div>
        ) : (
          /* VIEW 3: MAIN LIST SELECTION OF THREE Revision Modules */
          <motion.div 
            key="list"
            className="space-y-6"
          >
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
              <Trophy className="w-6 h-6 text-red-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-sans font-black tracking-tight uppercase">
                Exercícios de Fixação
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exerciseGroups.map((group) => {
                const groupImages: Record<number, string> = {
                  1: theologyManual,
                  2: doctrinesManual,
                  3: deliverancePrayers
                };
                const cardImage = groupImages[group.id] || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=640';

                return (
                  <div 
                    key={group.id}
                    className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden p-6 flex flex-col gap-4 shadow-lg hover:border-neutral-700 transition-all"
                  >
                    {/* Quiz Banner Thumbnail */}
                    <div className="h-32 w-full bg-neutral-950 relative overflow-hidden -mt-6 -mx-6 mb-2">
                      <img 
                        src={cardImage} 
                        alt={group.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-70 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest font-bold">
                        Desafio CFAP {group.range}
                      </span>
                      <h3 className="text-base font-sans font-black text-white mt-1 uppercase">
                        {group.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 font-sans">
                        {group.id === 1 ? 'Exercícios práticos de introdução teológica no reino do espírito.' : 
                         group.id === 2 ? 'Questionários doutrinários fundamentais para quebrar sofismas e fortalezas mentais.' :
                         'Orações e decretos estruturados para a libertação prática cotidiana das amarras hereditárias.'}
                      </p>
                    </div>

                    <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800/80 leading-none mt-auto">
                      <span className="text-[10px] text-neutral-500 font-mono">Volume de Questões:</span>
                      <span className="text-xs font-mono font-bold text-neutral-200 block mt-1">
                        {group.questions.length} Questões Registradas
                      </span>
                    </div>

                    <button
                      onClick={() => startQuiz(group)}
                      className="bg-red-650 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-widest py-2 rounded-md active:scale-95 transition-all outline-none cursor-pointer"
                    >
                      Iniciar Desafio
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
