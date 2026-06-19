/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { History, ShieldAlert, Award, FileText, Calendar, Info, Film, Flame } from 'lucide-react';
import theologyManual from '../assets/images/theology_manual_1781826901454.jpg';

interface AnneliseStoryProps {
  onBackToHome: () => void;
}

export default function AnneliseStory({ onBackToHome }: AnneliseStoryProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-neutral-200">
      
      {/* Upper Navigation link */}
      <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-sans font-black tracking-tight uppercase">
            Arquivo de Casos Reais
          </h1>
        </div>
        <button
          onClick={onBackToHome}
          className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          ← Voltar para Destaques
        </button>
      </div>

      {/* Featured Header Documentary Style */}
      <div className="relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row gap-6 mb-8 shadow-xl">
        <img 
          src={theologyManual} 
          alt="Annelise Case documentation" 
          referrerPolicy="no-referrer"
          className="w-full md:w-48 aspect-video md:aspect-[3/4] object-cover rounded-lg shrink-0 filter grayscale hover:grayscale-0 transition-all duration-500 shadow-md"
        />
        <div className="flex flex-col gap-3 justify-center text-justify">
          <span className="flex items-center gap-1 bg-red-950/80 text-red-500 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-red-900/60 uppercase tracking-widest leading-none w-fit">
            <Film className="w-3.5 h-3.5" /> Caso Clínico-Espiritual
          </span>
          <h2 className="text-xl sm:text-2.5xl font-sans font-black text-white uppercase tracking-tight leading-none">
            A História de Annelise Michel
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-sans">
            O dramático relato histórico de possessão demoníaca e exorcismo ocorrido na Alemanha na década de 1970 
            que desafiou psiquiatras, tribunais europeus e inspirou o consagrado filme Hollywoodiano 
            <strong> &ldquo;O Exorcismo de Emily Rose&rdquo;</strong>.
          </p>
          <div className="bg-neutral-950/60 border border-neutral-800 p-3 rounded text-[11px] text-neutral-300 font-mono flex items-center gap-2 max-w-md">
            <Info className="w-4 h-4 text-yellow-500 shrink-0" />
            <span>Material teológico de apoio para discernimento do CFAP.</span>
          </div>
        </div>
      </div>

      {/* Integrated YouTube Documentary Video Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 mb-8 shadow-xl relative overflow-hidden group hover:border-red-900/50 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="text-base font-sans font-black text-white uppercase tracking-tight">
              Investigação em Vídeo — O Caso Real em Detalhes
            </h3>
          </div>
          <span className="text-[9px] font-mono bg-red-950 text-red-500 border border-red-900/40 px-2.5 py-0.5 rounded uppercase font-bold self-start sm:self-auto">
            Documentário • Áudio em Português
          </span>
        </div>
        
        <p className="text-xs text-neutral-400 mb-5 leading-relaxed font-sans max-w-3xl">
          Assista ao documentário completo que analisa as fitas de áudio originais com as vozes de possessão gravadas 
          durante os rituais oficiais alemães de 1975, as análises médicas dos laudos clínicos, e o processo legal final dos padres e dos pais. 
          Excelente ferramenta audiovisual de discernimento teológico.
        </p>

        {/* Video player embedded with standard aspects */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl group-hover:border-neutral-700 transition-colors">
          <iframe 
            src="https://www.youtube.com/embed/2FmI5PV2suk" 
            title="O Caso Real de Anneliese Michel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
        
        <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[9px] font-mono text-neutral-500">
          <span>* Conteúdo sugerido para instrução complementar fundamentada sobre as 67 sessões autorizadas.</span>
          <span className="text-red-500 uppercase tracking-wider font-bold">Baseado em fatos históricos documentados</span>
        </div>
      </div>

      {/* Two Column Layout of Case Files */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Editorial detailed history */}
        <div className="lg:col-span-8 space-y-6 text-neutral-300 text-sm leading-relaxed text-justify font-sans">
          
          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h3 className="text-base font-sans font-black text-white uppercase border-b border-neutral-800 pb-1.5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              1. Infância e Criação
            </h3>
            <p>
              Annelise Michel nasceu em Leiblfing, no estado federal alemão da Baviera, mas foi criada juntamente com suas três irmãs no pequeno município de Klingenberg am Main. Seus pais, Anna e Josef Michel, muito religiosos e profundamente tradicionais, lhe deram uma educação rigorosamente católica.
            </p>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h3 className="text-base font-sans font-black text-white uppercase border-b border-neutral-800 pb-1.5 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              2. Diagnósticos Médicos do Colapso
            </h3>
            <p>
              Em 1968, com apenas dezesseis anos de idade, Annelise começou a manifestar tremores violentos, convulsões e rigidez repentinas que foram diagnosticadas clinicamente como epilepsia com traços graves de esquizofrenia na Clínica Psiquiátrica de Würzburg. No entanto, o tratamento com psicotrópicos fortes provou-se ineficaz.
            </p>
            <p>
              Durante a madrugada, o corpo de Annelise enrijecia violentamente, sob uma paralisia e forte sensação de peso sufocando seu peito. Ela afirmava ouvir sussurros asquerosos afirmando que sua alma &ldquo;queimaria no inferno&rdquo;, além de visões assustadoras com faces distorcidas e grotescas durante suas orações cotidianas.
            </p>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h3 className="text-base font-sans font-black text-white uppercase border-b border-neutral-800 pb-1.5 flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              3. O Grande Exorcismo (Os 6 Demônios)
            </h3>
            <p>
              Após a autorização do Bispo Josef Stangl em 1975, os padres Ernst Alt e Arnold Renz iniciaram as sessões do Grande Exorcismo nos moldes do <strong>Rituale Romanum</strong>.
            </p>
            <p>
              Durante as exaustivas 67 sessões registradas em fitas cassete cassadas pela justiça, manifestaram-se seis inteligências demoníacas distintas que falavam em coro ou alternadamente e respondiam pelos nomes históricos de: 
              <strong> Lúcifer, Caim, Judas, Nero, Hitler e Fleischmann</strong> (um padre apóstata do século XVI).
            </p>
            <p>
              A jovem recusava-se a se alimentar, alimentava-se de moscas e rastejava curvada pelo chão de forma serpentina, exibindo força sobre-humana e horror violento a todos os símbolos, hóstias e imagens religiosas consagradas.
            </p>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h3 className="text-base font-sans font-black text-white uppercase border-b border-neutral-800 pb-1.5 flex items-center gap-2">
              <Award className="w-5 h-5 text-red-500" />
              4. A Revelação e o Martírio
            </h3>
            <p>
              Durante o exorcismo, Annelise relatou ter tido um sonho celestial extraordinário com a Virgem Maria, onde lhe foi dada uma escolha suprema: ser liberta imediatamente do jugo demoníaco ou continuar voluntariamente exposta ao martírio para que toda a humanidade moderna testemunhasse de forma inequívoca a realidade ativa do mundo invisível de demônios. Annelise optou de forma corajosa pela segunda escolha.
            </p>
            <p>
              Annelise faleceu de desnutrição e severa desidratação em repouso no dia 1 de julho de 1976, aos 23 anos, pesando pouco mais de 30 quilos. Os pais e os dois padres envolvidos foram julgados e condenados à prisão domiciliar condicional sob alegação de homicídio culposo por negligência médica do estado psíquico.
            </p>
          </div>

        </div>

        {/* Right Side: Tabular Clinical Document and Date Chronicles */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-sm font-sans font-bold text-neutral-200 uppercase tracking-widest border-b border-neutral-800 pb-1.5">
              Ficha Técnica do Caso
            </h3>
            
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span className="text-neutral-500">Nome original:</span>
                <span className="text-neutral-200 font-bold">Annelise Michel</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span className="text-neutral-500">Nascimento:</span>
                <span className="text-white">Alemanha, 21/09/1952</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span className="text-neutral-500">Falecimento:</span>
                <span className="text-red-500 font-bold">01/07/1976 (23 anos)</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span className="text-neutral-500">Nº de Exorcismos:</span>
                <span className="text-yellow-500 font-bold">67 Sessões Ativas</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1">
                <span className="text-neutral-500">Demônios Declarados:</span>
                <span className="text-white text-right font-sans">Lúcifer, Caim, Judas, Nero, Hitler, Fleischmann</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-neutral-500">Filme Inspirado:</span>
                <span className="text-yellow-500 italic font-sans text-right">O Exorcismo de Emily Rose</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-sm font-sans font-bold text-neutral-200 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-500" />
              Cronologia de Evidências
            </h3>
            
            <div className="space-y-4 relative pl-4 border-l border-neutral-800">
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-red-600 border border-neutral-900"></span>
                <span className="text-[10px] font-mono text-yellow-500 font-bold block">1968</span>
                <p className="text-xs text-neutral-300 mt-0.5">Primeiros colapsos epiléticos; internações em Würzburg.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-neutral-800 border border-neutral-900"></span>
                <span className="text-[10px] font-mono text-neutral-500 block">1973</span>
                <p className="text-xs text-neutral-300 mt-0.5">Frustração de tratamentos clínicos; surgem as visões assustadoras e rastejos.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-red-600 border border-neutral-900"></span>
                <span className="text-[10px] font-mono text-yellow-500 font-bold block">1975</span>
                <p className="text-xs text-neutral-300 mt-0.5">Bispo autoriza exorcismos oficiais; gravação das lendárias 40 fitas.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-red-600 border border-neutral-900"></span>
                <span className="text-[10px] font-mono text-red-500 font-bold block">1976</span>
                <p className="text-xs text-neutral-300 mt-0.5">Morte em paz de madrugada; início do caso na corte europeia.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
