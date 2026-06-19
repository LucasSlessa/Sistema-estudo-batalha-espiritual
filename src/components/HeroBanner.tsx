/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, ClipboardCheck, History, Award, Shield } from 'lucide-react';
import { UserProgress } from '../types';
import heroWarfareBanner from '../assets/images/hero_warfare_banner_1781825214647.jpg';

interface HeroBannerProps {
  progress: UserProgress;
  onPlayClick: () => void;
  onDiagnosticoClick: () => void;
  onAnneliseClick: () => void;
}

export default function HeroBanner({ progress, onPlayClick, onDiagnosticoClick, onAnneliseClick }: HeroBannerProps) {
  const hasStarted = progress.completedLessons.length > 0;

  return (
    <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] md:aspect-[2.4/1] min-h-[300px] overflow-hidden bg-neutral-950 flex items-end">
      {/* Absolute image overlay with horizontal/vertical fading */}
      <img
        src={heroWarfareBanner}
        alt="Batalha Espiritual Hero Banner"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
      />
      {/* Gradients to blend image cleanly with dark layout */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent"></div>

      {/* Floating Meta Brand Banner */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-12 md:pb-16 pt-32 flex flex-col items-start gap-3 sm:gap-4">
        
        {/* Dynamic Netflix Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 bg-neutral-900/90 text-amber-500 border border-neutral-800/80 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <Shield className="w-3.5 h-3.5 text-red-500" /> Libertação e Quebra de Maldições
          </span>
        </div>

        {/* Cinematic Title Block */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter text-white drop-shadow-lg leading-tight uppercase">
            BATALHA ESPIRITUAL
          </h1>
          <p className="text-[10px] sm:text-sm font-mono font-semibold text-yellow-500 uppercase tracking-widest leading-none mt-1.5">
            Curso de Libertação, Proteção e Autoridade em Cristo
          </p>
        </div>

        {/* Short Concept description */}
        <p className="max-w-xl text-[11px] sm:text-sm text-neutral-300 line-clamp-3 sm:line-clamp-none filter drop-shadow font-sans subpixel-antialiased leading-relaxed">
          Aprenda a mapear e anular bloqueios, heranças de iniquidades consanguíneas, 
          identificar principados territoriais e se vestir com a Armadura de Deus para expulsar 
          fortalezas sobre a mente, corpo e finanças.
        </p>

        {/* Playable buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-4 w-full sm:w-auto">
          {/* Main Study Continuation Trigger */}
          <button
            onClick={onPlayClick}
            className="flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all px-4 sm:px-6 py-2.5 sm:py-3 rounded font-bold text-sm shadow-lg w-full sm:w-auto text-center"
          >
            <Play className="w-4 h-4 fill-current" />
            {hasStarted ? 'Continuar Curso' : 'Começar do Capítulo 1'}
          </button>

          {/* Quick Questionnaire Shortcut */}
          <button
            onClick={onDiagnosticoClick}
            className="flex items-center justify-center gap-2 bg-neutral-900/90 text-neutral-100 hover:bg-neutral-800 border border-neutral-700 active:scale-95 transition-all px-4 sm:px-5 py-2.5 sm:py-3 rounded font-semibold text-sm shadow-md w-full sm:w-auto text-center"
          >
            <ClipboardCheck className="w-4 h-4 text-red-500" />
            Auto-Questionário
          </button>

          {/* Historical Case study */}
          <button
            onClick={onAnneliseClick}
            className="flex items-center justify-center gap-2 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800/80 hover:text-white border border-neutral-800 active:scale-95 transition-all px-4 sm:px-4 py-2 sm:py-2.5 rounded font-medium text-xs shadow-sm w-full sm:w-auto text-center"
          >
            <History className="w-3.5 h-3.5 text-neutral-400" />
            Caso Annelise Michel
          </button>
        </div>

      </div>
    </div>
  );
}
