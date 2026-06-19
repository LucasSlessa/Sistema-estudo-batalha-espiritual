/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Flame, Activity, CheckCircle, Sparkles, AlertTriangle } from 'lucide-react';

interface BodyPoint {
  id: string;
  name: string;
  subtitle: string;
  significance: string;
  prayer: string;
  coordinates: { x: string; y: string }; // Absolute positioning percentage on human chart
}

export default function BodyMapUnction() {
  const [selectedPoint, setSelectedPoint] = useState<BodyPoint | null>(null);
  const [consecratedPoints, setConsecratedPoints] = useState<string[]>([]);

  const bodyPoints: BodyPoint[] = [
    {
      id: 'coronario',
      name: 'Coronário',
      subtitle: 'Topo da Cabeça',
      significance: 'Desliga poderes das trevas sobre a linhagem secular; liga a mente espiritual ao trono divino.',
      prayer: 'Fecho o comando sobre esta área, desligando os poderes das trevas sobre esta vida e a vida de seus familiares. Ligo esta área ao trono do Deus Altíssimo para que tenha a mesma alegria e sentimento de Cristo, sentindo e pensando nas coisas do alto. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '6%' }
    },
    {
      id: 'frontal',
      name: 'Frontal',
      subtitle: 'Entre os Olhos',
      significance: 'Desliga mentiras mentais, confusões ideológicas, sofismas e anula filosofias mundanas contrárias.',
      prayer: 'Senhor, desligo agora todos os poderes malignos sobre esta área e declaro que os demônios não terão poderes para confundir, distorcer os pensamentos ou provocar confusão mental. A Tua Palavra diz que “as armas da nossa milícia não são carnais, mas são poderosas em Deus, para destruir fortalezas (emoções e sentimentos danificados pelos sofrimentos), anulando sofismas (filosofias e pensamentos do mundo) e toda altivez que se levante contra o conhecimento de Deus, levando cativo todo pensamento à obediência de Cristo”. Fecho esta mente para as coisas do mundo e das trevas, e abro-a para o Reino de Deus. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '12%' }
    },
    {
      id: 'olhos',
      name: 'Olhos',
      subtitle: 'Pálpebras (Olhos Fechados)',
      significance: 'Remove escamas de cegueira e concupiscência visual.',
      prayer: 'Em nome de Jesus Cristo, ordeno que sejam retiradas as escamas da cegueira espiritual e da concupiscência dos olhos. A todos os enviados de Satanás, eu ordeno que deixem esta vida e peço que seja colocado o colírio do Espírito Santo para que vejam, Senhor, a Tua verdade e contemplem as maravilhas da Tua Lei. Em nome de Jesus, Amém!',
      coordinates: { x: '45%', y: '14%' }
    },
    {
      id: 'ouvidos',
      name: 'Ouvidos',
      subtitle: 'Entradas do conduto auditivo',
      significance: 'Filtragem auditiva e equilíbrio emocional/físico das palavras ouvidas.',
      prayer: 'Senhor, coloca Teu Espírito Santo como um filtro nestes ouvidos, para que haja entendimento em tudo o que eles ouvirem, pois a Tua Palavra diz que “nem olhos viram, nem ouvidos ouviram, nem jamais penetrou em coração humano o que Deus tem preparado para aqueles que O amam”. E, com esta unção, eu produzo equilíbrio no corpo físico, emocional e espiritual desta vida. Em nome de Jesus, amém!',
      coordinates: { x: '55%', y: '14%' }
    },
    {
      id: 'narinas',
      name: 'Narinas',
      subtitle: 'Vias respiratórias',
      significance: 'Quebra cadeias no sistema respiratório, trazendo o fôlego abundante da vida.',
      prayer: 'Senhor, unjo estas narinas para que sejam quebradas todas as cadeias de comando das trevas nas vias respiratórias, limpando o nariz, a faringe, a traquéia, os pulmões, os bronquíolos e os alvéolos. Coloco o filtro do Teu Espírito sobre estas narinas e peço que Tu sopres o fôlego de vida que colocastes em Adão, quando o criastes, para que tenha vida em abundância. Quebramos e resistimos a qualquer contaminação do ar e às enfermidades das vias respiratórias. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '16%' }
    },
    {
      id: 'labios',
      name: 'Lábios',
      subtitle: 'Boca',
      significance: 'Queima as iniquidades da fala; consagração para orações e sacrifícios de purificação.',
      prayer: 'Com esta unção eu queimo estes lábios com a brasa do altar de Deus, como foi feito com Isaías, para que sejam queimadas suas iniquidades e perdoados os seus pecados. Que esta boca sempre ofereça a Deus sacrifícios de louvor, que é o fruto de lábios que confessam o Seu nome. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '19%' }
    },
    {
      id: 'laringeo',
      name: 'Laríngeo',
      subtitle: 'Pomo de Adão (Garganta)',
      significance: 'Bloqueio de disfunções na tireoide e proteção das cordas vocais contra desânimo.',
      prayer: 'Fecho os canais de utilização das trevas sobre esta área, bem como sobre as cordas vocais. Rejeito e desligo os poderes sobre as glândulas tireóide e paratireóide, e ordeno que todas as disfunções e alterações metabólicas que foram provocadas pelos espíritos malignos sejam corrigidas agora pelo Espírito Santo, em nome de Jesus Cristo, regulando-as de maneira perfeita como o Senhor as criou. Coloco as cordas vocais em sujeição e domínio do Espírito Santo de Deus, e repreendo, em nome de Jesus, o demônio que produz pensamentos e atitudes de que “não adianta lutar”, e toda forma de destruição óssea. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '22%' }
    },
    {
      id: 'coracao',
      name: 'Coração',
      subtitle: 'Lado esquerdo do peito',
      significance: 'Cura e purificação de endurecimentos, traumas traumáticos do passado e recordações ruins.',
      prayer: 'Senhor, com esta unção eu trago uma visitação do Espírito Santo sobre este coração, desfazendo qualquer endurecimento ou resistência que possa haver, criando um coração puro e renovado que possa guardar as palavras do Senhor, e não pecar contra Ele. Que este coração seja sensível às necessidades dos seus semelhantes. Repreendo os demônios que trazem lembranças desagradáveis e traumas sofridos no passado. Em nome de Jesus, amém!',
      coordinates: { x: '47%', y: '29%' }
    },
    {
      id: 'baco_pancreas',
      name: 'Baço e Pâncreas',
      subtitle: 'Lado esquerdo (Costelas)',
      significance: 'Purificação celular física e quebra de diabetes espiritual e infecções sanguíneas.',
      prayer: 'Senhor, eu limpo e purifico cada célula desta área com o fogo do Espírito Santo, para quebrar qualquer contaminação que possa haver do mundo espiritual com o mundo físico. Expulso os espíritos de enfermidades sobre o baço e o pâncreas, para que não causem alterações sanguíneas e diabetes, pois a Palavra do Senhor diz que “Jesus tomou sobre si todas as nossas enfermidades, e as nossas dores levou sobre si, e pelas Suas pisaduras fomos sarados”. Em nome de Jesus, amém!',
      coordinates: { x: '46%', y: '36%' }
    },
    {
      id: 'figado_vesicula',
      name: 'Fígado e Vesícula',
      subtitle: 'Lado direito (Costelas)',
      significance: 'Limpeza de resíduos químicos, de álcool ou drogas; repreensão de espíritos de ira e ódio.',
      prayer: 'Senhor, coloco diante do Teu altar, para consagração, esses órgãos vitais, para que os espíritos não tenham acesso a eles e tentem provocar doenças. Desfaço qualquer resquício de bebidas alcóolicas ou drogas que foram tomadas no passado e causaram enfermidades nestes órgãos. Repreendo todos os espíritos de ira e ódio que estejam nestas áreas. Em nome de Jesus, amém!',
      coordinates: { x: '54%', y: '36%' }
    },
    {
      id: 'umbilical',
      name: 'Umbilical',
      subtitle: 'Umbigo',
      significance: 'Corta o elo umbilical das transmissões genéticas e doenças herdadas dos pais.',
      prayer: 'Com esta unção eu rompo todas as influências malignas sobre essa vida, desde o dia de sua concepção até o dia de hoje. Corto o cordão umbilical que a liga às doenças familiares, heranças demoníacas e pecaminosas e influências negativas do passado e dos seus pais, e crio um novo cordão que é ligado a Jesus Cristo, para que este corpo se torne um templo do Espírito Santo. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '42%' }
    },
    {
      id: 'maos',
      name: 'Mãos',
      subtitle: 'Mãos e Dedos',
      significance: 'Consagração de trabalho de obras, destravar financeiro e cura ministerial de imposição.',
      prayer: 'Com esta unção quebro toda a influência maligna sobre estas mãos e libero graça para que o Senhor possa confirmar as Suas obras. Que estas mãos estejam aptas para receber de Deus e socorrer os necessitados e libertar os cativos e oprimidos. Que se tornem mãos que produzam bênçãos, inclusive no trabalho e na área financeira. Em nome de Jesus, amém!',
      coordinates: { x: '35%', y: '50%' }
    },
    {
      id: 'genital',
      name: 'Genital',
      subtitle: 'Região Pubiana',
      significance: 'Purificação sexual, libertamento de estupros sofridos, abortos emocionais, abusos ou vícios.',
      prayer: 'Com esta unção eu abençoo esta vida, libertando-a de influências malignas na área sexual, liberando-a para que tenha domínio sobre sua sexualidade. Quebro toda influência de experiências traumáticas ou agressões sofridas no passado, curando esta vida de qualquer enfermidade física ou emocional que afete esta área. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '51%' }
    },
    {
      id: 'rins_suprarrenais',
      name: 'Rins e Suprarrenais',
      subtitle: 'Costas',
      significance: 'Estabilização de medos crônicos, pânico infundado e restauração de energia vital humana.',
      prayer: 'Com esta unção eu limpo e purifico estes órgãos, normalizando suas funções. Repreendo os demônios de medo, para que esta vida possa confiar, se alegrar e aprender no Senhor. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '47%' }
    },
    {
      id: 'coluna_coccyx',
      name: 'Coluna e Cóccix',
      subtitle: 'Nuca ao Cóccix',
      significance: 'Quebra do demônio de possessão "kundaline", pesos físicos desequilibrantes nas vértebras.',
      prayer: 'Com esta unção eu quebro os poderes das trevas sobre estes órgãos, e ordeno que todos os espíritos malignos saíam desta coluna, deixando este corpo livre de pesos, dores, desgastes e diferenças no tamanho dos membros superiores e inferiores. Com a unção sobre o cóccix eu ordeno que o demônio chamado “kundaline” não mais atue sobre este corpo, e o liberto para receber energia direta do trono de Deus. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '33%' }
    },
    {
      id: 'pes',
      name: 'Pés',
      subtitle: 'Tornozelos e Peito do Pé',
      significance: 'Remoção de marcas de caminhos tortuosos; calçar as sandálias do Evangelho da Paz.',
      prayer: 'Com esta unção abençôo estes pés e, com a autoridade do Nome de Jesus, eu desmancho toda marca deixada pelo maligno quando andarem em caminhos tortuosos, levados por Satanás. Lavo-os com o sangue de Jesus e calço neles as sandálias do Evangelho da Paz, para que andem em caminhos retos, e sejam guardados por Deus de todo mal. Em nome de Jesus, amém!',
      coordinates: { x: '50%', y: '92%' }
    }
  ];

  const handleToggleConsecrate = (id: string) => {
    if (consecratedPoints.includes(id)) {
      setConsecratedPoints(prev => prev.filter(p => p !== id));
    } else {
      setConsecratedPoints(prev => [...prev, id]);
    }
  };

  const currentIdx = selectedPoint ? bodyPoints.findIndex(p => p.id === selectedPoint.id) : -1;

  const navigatePoint = (direction: 'prev' | 'next') => {
    if (currentIdx === -1) return;
    let nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
    if (nextIdx >= bodyPoints.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = bodyPoints.length - 1;
    setSelectedPoint(bodyPoints[nextIdx]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-neutral-200">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-widest flex items-center justify-center mb-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-1 w-fit mx-auto">
          ANEXO 2 • SÉRIE PRÁTICA
        </span>
        <h1 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white uppercase mt-2">
          Unção Corporal de Libertação
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 text-justify sm:text-center leading-relaxed font-sans">
          Jesus Cristo costumava tocar fisicamente nas áreas de aflição das pessoas para curá-las. 
          Use este mapeamento interativo para ungir e desligar poderes ocultos das áreas de contato espiritual 
          do seu corpo, restaurando a santidade plena.
        </p>

        {/* Progress Tracker */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 mt-5 flex items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-neutral-200">Progresso do Alinhamento</span>
            <span className="text-[10px] font-mono text-neutral-400">
              {consecratedPoints.length} de {bodyPoints.length} pontos de contato consagrados
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-500">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            {Math.round((consecratedPoints.length / bodyPoints.length) * 100)}% Concluído
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT: Clicking Body Scan Interactive layout */}
        <div className="lg:col-span-5 bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 flex items-center justify-center relative min-h-[450px] shadow-lg">
          
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest leading-none">
              Scanner Ativo
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              Clique nos pontos para abrir a Oração
            </span>
          </div>

          {/* Futuristic Anatomical Silicon Silhouette (SVG Graphic) */}
          <div className="relative w-72 h-[500px]">
            <svg 
              className="absolute inset-0 w-full h-full text-neutral-800 fill-current" 
              viewBox="0 0 200 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Silhouette outline path */}
              <path 
                d="M100,20 C110,20 115,25 115,35 C115,45 110,50 100,50 C90,50 85,45 85,35 C85,25 90,20 100,20 Z M100,52 C104,52 106,56 106,64 C100,64 100,64 94,64 C94,56 96,52 100,52 Z M100,66 C115,66 128,72 132,86 C136,100 138,125 142,150 C146,175 148,200 148,210 C148,220 144,220 142,220 C140,220 136,210 134,180 C132,150 130,130 130,120 L130,170 C130,195 125,230 120,260 C115,290 112,320 108,350 L108,385 C108,395 102,395 100,395 C98,395 92,395 92,385 L92,350 C88,320 85,290 80,260 C75,230 70,195 70,170 L70,120 C70,130 68,150 66,180 C64,210 60,220 58,220 C56,220 52,220 52,210 C52,200 54,175 58,150 C62,125 64,100 68,86 C72,72 85,66 100,66 Z" 
                className="fill-neutral-900 stroke-neutral-800 stroke-2"
              />
            </svg>

            {/* Glowing Scan Rings & Coordinates for interactables */}
            {bodyPoints.map((point) => {
              const isActive = selectedPoint?.id === point.id;
              const isConsecrated = consecratedPoints.includes(point.id);

              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className="absolute group z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                  style={{ left: point.coordinates.x, top: point.coordinates.y }}
                >
                  <span className={`absolute flex h-5 w-5 rounded-full opacity-60 transition-all ${
                    isActive 
                      ? 'animate-ping bg-red-500' 
                      : isConsecrated 
                        ? 'bg-emerald-500 group-hover:block hidden' 
                        : 'group-hover:animate-ping bg-yellow-500'
                  }`}></span>
                  <span className={`relative rounded-full h-3.5 w-3.5 flex items-center justify-center border text-[8px] font-bold font-mono transition-all ${
                    isActive
                      ? 'bg-red-600 border-white text-white shadow-[0_0_12px_#ef4444]'
                      : isConsecrated
                        ? 'bg-emerald-600 border-neutral-800 text-white shadow-[0_0_8px_#10b981]'
                        : 'bg-neutral-950 border-neutral-700 text-neutral-400 group-hover:border-yellow-400 group-hover:text-yellow-400 shadow'
                  }`}>
                    {isConsecrated ? '✓' : ''}
                  </span>
                  
                  {/* Tooltip on hovering parts */}
                  <span className="absolute left-8 bg-neutral-950/95 border border-neutral-800 text-neutral-200 text-[10px] font-mono px-2 py-1 rounded hidden group-hover:block shadow-md whitespace-nowrap z-30 leading-none">
                    {point.name}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT COMPONENT: Context reader of selected unction prayer */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {selectedPoint ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl relative min-h-[450px]">
              
              {/* Point Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest">
                    ÁREA DE UNÇÃO: {selectedPoint.subtitle}
                  </span>
                  <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase flex items-center gap-2 mt-0.5">
                    <Flame className="w-5 h-5 text-red-500 shrink-0" />
                    {selectedPoint.name}
                  </h2>
                </div>

                <button
                  onClick={() => handleToggleConsecrate(selectedPoint.id)}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded text-xs font-mono font-bold uppercase transition-all ${
                    consecratedPoints.includes(selectedPoint.id)
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                      : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-neutral-700'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {consecratedPoints.includes(selectedPoint.id) ? 'Consagrado ✓' : 'Marcar Consagrado'}
                </button>
              </div>

              {/* Spiritual significance description banner */}
              <div className="bg-red-950/10 border-l-4 border-red-600/60 p-4 rounded-r mt-2">
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Significado Espiritual
                </span>
                <p className="text-xs text-neutral-300 mt-1 lines-relaxed antialiased">
                  {selectedPoint.significance}
                </p>
              </div>

              {/* LITERAL PRAYER OVERLAY BOX */}
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-widest">
                  Leia a Oração Declarativa em Voz Alta:
                </span>
                <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-lg select-text text-neutral-200">
                  <p className="text-sm leading-relaxed italic text-justify text-neutral-200">
                    &ldquo;{selectedPoint.prayer}&rdquo;
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-800">
                <button
                  onClick={() => navigatePoint('prev')}
                  className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  ← Área Anterior
                </button>

                <span className="text-[10px] font-mono text-neutral-500">
                  {bodyPoints.findIndex(p => p.id === selectedPoint.id) + 1} de {bodyPoints.length}
                </span>

                <button
                  onClick={() => navigatePoint('next')}
                  className="text-xs font-mono text-red-500 hover:text-white font-bold transition-all"
                >
                  Próxima Área →
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-neutral-900/20 border border-neutral-800 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[450px]">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Activity className="w-8 h-8 text-neutral-600 animate-pulse" />
              </div>
              <h3 className="text-base font-sans font-bold text-neutral-400 uppercase tracking-wider">
                Mapeamento Clínico Vazio
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
                Clique em qualquer ponto de indicação do corpo esquematizado à esquerda para exibir o roteiro 
                manual de unção, unção de pálpebras, lábios, narinas e orações específicas correspondentes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                {bodyPoints.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPoint(p)}
                    className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 px-2.5 py-1 rounded-full"
                  >
                    {p.name}
                  </button>
                ))}
                <span className="text-[9px] text-neutral-500 font-mono">e mais {bodyPoints.length - 4}...</span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
