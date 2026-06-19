/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, BookOpen, PenTool, Activity, Flame, Trophy, Award } from 'lucide-react';
import { UserProgress } from '../types';
import systemLogo from '../assets/images/system_logo_1781827622851.jpg';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  progress: UserProgress;
  totalLessons: number;
}

export default function Navbar({ currentTab, setCurrentTab, progress, totalLessons }: NavbarProps) {
  const completedCount = progress.completedLessons.length;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  // Calculate dynamic rank for user based on milestones
  let rank = "Recruta";
  let rankIcon = <Flame className="w-4 h-4 text-gray-400" />;
  if (completedCount >= totalLessons * 0.8) {
    rank = "Guerreiro de Elite";
    rankIcon = <Trophy className="w-4 h-4 text-yellow-400" />;
  } else if (completedCount >= totalLessons * 0.4) {
    rank = "Tenente Espiritual";
    rankIcon = <Award className="w-4 h-4 text-indigo-400" />;
  } else if (completedCount > 0) {
    rank = "Sentinela Ativo";
    rankIcon = <Shield className="w-4 h-4 text-emerald-400" />;
  }

  const navItems = [
    { id: 'inicio', label: 'Início', icon: Shield },
    { id: 'modulos', label: 'Aulas', icon: BookOpen },
    { id: 'praticas', label: 'Orações', icon: Activity },
    { id: 'diagnostico', label: 'Questionário', icon: PenTool }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setCurrentTab('inicio')}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-800 flex items-center justify-center bg-black transition-all group-hover:border-red-600 shadow-[0_0_15px_rgba(185,28,28,0.2)]">
                <img 
                  src={systemLogo} 
                  alt="System Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-sans font-black tracking-wider text-red-600 uppercase group-hover:text-red-500 transition-colors">
                  BATALHA
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-yellow-500 leading-none">
                  ESPIRITUAL
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-neutral-800 text-white border-b-2 border-red-600 shadow-inner'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* User Profile Progress Widget */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  {rankIcon}
                  <span className="text-xs font-mono font-bold text-neutral-200">
                    {rank}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {completedCount}/{totalLessons} Aulas Concluídas
                </span>
              </div>

              {/* Circular representation of completion percentage */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="absolute transform -rotate-90 w-10 h-10">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    strokeWidth="3.5"
                    stroke="#262626"
                    fill="transparent"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    strokeWidth="3.5"
                    stroke="#DC2626"
                    fill="transparent"
                    strokeDasharray={100}
                    strokeDashoffset={100 - percentage}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="text-[10px] font-mono font-bold text-red-500">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-900/80 px-2 py-3 flex items-center justify-around pb-[calc(env(safe-area-inset-bottom)+12px)]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center py-1 px-1 select-none active:scale-95 transition-all relative w-1/4 ${
                isActive ? 'text-red-500 font-bold' : 'text-neutral-400'
              }`}
            >
              {isActive && (
                <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-red-600 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
              )}
              <span className="text-[10px] font-sans font-bold tracking-tight uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
