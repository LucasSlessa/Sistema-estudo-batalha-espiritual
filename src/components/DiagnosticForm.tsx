/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, Flame, FileText, CheckSquare, HeartHandshake, Sparkles, 
  ChevronRight, ChevronLeft, Info, RefreshCw, BookOpen, AlertCircle
} from 'lucide-react';
import { UserProgress } from '../types';

interface DiagnosticFormProps {
  progress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
}

export default function DiagnosticForm({ progress, onSaveProgress }: DiagnosticFormProps) {
  const [step, setStep] = useState<number>(1);
  const [showReport, setShowReport] = useState<boolean>(
    !!progress.questionnaireResponse?.personalData?.nome
  );

  // Default state initialization of fields
  const [nome, setNome] = useState(progress.questionnaireResponse?.personalData?.nome || '');
  const [sexo, setSexo] = useState(progress.questionnaireResponse?.personalData?.sexo || 'M');
  const [idade, setIdade] = useState(progress.questionnaireResponse?.personalData?.idade || '');
  const [civil, setCivil] = useState(progress.questionnaireResponse?.personalData?.estadoCivil || 'Solteiro');
  const [profissao, setProfissao] = useState(progress.questionnaireResponse?.personalData?.profissao || '');

  const [relacionamentoFamiliar, setRelacionamentoFamiliar] = useState(
    progress.questionnaireResponse?.textAnswers?.relacionamentoFamiliar || ''
  );
  const [motivosQuebra, setMotivosQuebra] = useState(
    progress.questionnaireResponse?.textAnswers?.motivosQuebra || ''
  );
  const [relacionamentoPais, setRelacionamentoPais] = useState(
    progress.questionnaireResponse?.textAnswers?.relacionamentoPais || ''
  );
  const [traumasPassado, setTraumasPassado] = useState(
    progress.questionnaireResponse?.textAnswers?.traumasPassado || ''
  );
  const [compulsoesAmaldicoar, setCompulsoesAmaldicoar] = useState(
    progress.questionnaireResponse?.textAnswers?.compulsoesAmaldicoar || ''
  );
  const [repulsaBiblia, setRepulsaBiblia] = useState(
    progress.questionnaireResponse?.textAnswers?.repulsaBiblia || ''
  );
  const [pensamentosSuicidio, setPensamentosSuicidio] = useState(
    progress.questionnaireResponse?.textAnswers?.pensamentosSuicidio || ''
  );

  // Multidimensional checklist selected nodes
  const [checkedItems, setCheckedItems] = useState<string[]>(
    progress.questionnaireResponse?.checkedItems || []
  );

  const toggleItem = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(prev => prev.filter(x => x !== item));
    } else {
      setCheckedItems(prev => [...prev, item]);
    }
  };

  // Checkbox collections directly derived from Page 42-44
  const maldiçõesFamiliares = [
    'Idolatria na família', 'Depressão/Doenças emocionais', 'Suicídios ou mortes precoces',
    'Abortos', 'Rebelião crônica', 'Divórcios ou brigas conjugais', 'Miséria ou ruína financeira',
    'Vícios (álcool, drogas)', 'Problemas emocionais ocultos', 'Enfermidades hereditárias'
  ];

  const religioesSeitas = [
    'Catolicismo Romano', 'Kardecismo (Espiritismo)', 'Seicho-no-iê', 'Umbanda / Candomblé',
    'Maçonaria', 'Rosa Cruz', 'Budismo', 'Nova Era / Astrologia', 'Satanismo', 'Ufologia',
    'Benzimentos e Simpatias', 'Consultas a Mortos'
  ];

  const sentimentosAtitudes = [
    'Amarguras profundas', 'Ódio, ira ou desejo de vingança', 'Sentimento de Rejeição',
    'Ansiedade ou medos frequentes', 'Insônia ou pesadelos repetitivos', 'Autopunição ou culpas',
    'Vícios ativos', 'Pensamentos impuros recorrentes', 'Orgulho ou arrogância', 'Medo de morrer'
  ];

  const sintomasFisicos = [
    'Dores que "andam" no corpo sem motivo médico', 'Desmaios repentinos ou tonturas',
    'Sono incontrolável durante orações', 'Apertos na cabeça ou peito', 'Fobias inexplicáveis',
    'Sensação de presenças no quarto'
  ];

  const handleSubmit = () => {
    const updated: UserProgress = {
      ...progress,
      questionnaireResponse: {
        personalData: { nome, sexo, idade, estadoCivil: civil, profissao },
        checkedItems,
        textAnswers: {
          relacionamentoFamiliar, motivosQuebra, relacionamentoPais, traumasPassado,
          compulsoesAmaldicoar, repulsaBiblia, pensamentosSuicidio
        }
      }
    };
    onSaveProgress(updated);
    setShowReport(true);
  };

  const handleReset = () => {
    setNome(''); setSexo('M'); setIdade(''); setCivil('Solteiro'); setProfissao('');
    setRelacionamentoFamiliar(''); setMotivosQuebra(''); setRelacionamentoPais(''); setTraumasPassado('');
    setCompulsoesAmaldicoar(''); setRepulsaBiblia(''); setPensamentosSuicidio('');
    setCheckedItems([]);
    
    const updated = { ...progress, questionnaireResponse: undefined };
    onSaveProgress(updated);
    setShowReport(false);
    setStep(1);
  };

  // ANALYSIS REPORT GENERATOR: Custom engine evaluating checked items
  const generateAnalysis = () => {
    const alerts = [];
    const prayersToRecite = [];
    const recommendedUnctions = [];

    // Checked list evaluation
    if (checkedItems.includes('Catolicismo Romano')) {
      alerts.push({
        title: 'Elos com Idolatria Tradicional (Catolicismo)',
        desc: 'Identificado envolvimento pessoal ou herança católica. Recomenda-se orar a renúncia que quebra ligações a santos, procissões, batismos anteriores e velas acesas.'
      });
      prayersToRecite.push('catolicismo');
    }

    if (checkedItems.includes('Kardecismo (Espiritismo)') || checkedItems.includes('Umbanda / Candomblé') || checkedItems.includes('Benzimentos e Simpatias') || checkedItems.includes('Consultas a Mortos')) {
      alerts.push({
        title: 'Alianças com Seitas Ocultas (Espiritismo / Umbanda)',
        desc: 'Identificou-se consultas diretas a entidades ou consultas de cartas. Isto dá legalidade a demônios mentirosos e espíritos familiares que imitam pessoas mortas.'
      });
      prayersToRecite.push('espiritismo');
    }

    if (checkedItems.includes('Maçonaria')) {
      alerts.push({
        title: 'Ataduras Secretas Consanguíneas (Maçonaria)',
        desc: 'A Maçonaria exige juramentos terríveis no altar que trazem amarras financeiras e cegueira espiritual severa até a 10ª geração.'
      });
      prayersToRecite.push('maconaria');
    }

    if (checkedItems.includes('Nova Era / Astrologia') || checkedItems.includes('Seicho-no-iê') || checkedItems.includes('Rosa Cruz')) {
      alerts.push({
        title: 'Influência Metafísica Autotímica (Nova Era)',
        desc: 'Doutrinas de poder da mente e mapa astral que tentam tirar a soberania absoluta de Deus sobre as circunstâncias da vida.'
      });
      prayersToRecite.push('novaera');
    }

    // Evaluate Principado Overlords active based on symptoms
    const overwritingOverlords = [];
    if (checkedItems.includes('Depressão/Doenças emocionais') || checkedItems.includes('Sentimento de Rejeição') || checkedItems.includes('Amarguras profundas')) {
      overwritingOverlords.push('Damian (Principado da Derrota e Emoções)');
      recommendedUnctions.push('Coração', 'Fígado (repreensão de ira e ressentimentos)');
    }
    if (checkedItems.includes('Vícios (álcool, drogas)') || checkedItems.includes('Satanismo')) {
      overwritingOverlords.push('Diana / Asmodeus (Abuso e Vícios)');
      recommendedUnctions.push('Genital (purificação e domínio próprio)');
    }
    if (checkedItems.includes('Divórcios ou brigas conjugais') || checkedItems.includes('Abortos')) {
      overwritingOverlords.push('Moloque (Destruição do Lar e Relações)');
      recommendedUnctions.push('Umbilical (quebra de influências genéticas)');
    }
    if (checkedItems.includes('Miséria ou ruína financeira')) {
      overwritingOverlords.push('Mamom (Principado da Avareza e Miséria)');
      recommendedUnctions.push('Mãos (consagração de obras e colheita)');
    }
    if (checkedItems.includes('Ansiedade ou medos frequentes') || checkedItems.includes('Insônia ou pesadelos repetitivos') || checkedItems.includes('Dores que "andam" no corpo sem motivo médico')) {
      overwritingOverlords.push('Menghlesh / Apolion (Principado do Medo)');
      recommendedUnctions.push('Cabeça (Coronário/Frontal)', 'Rins (estabilização do pânico)');
    }

    return { alerts, prayersToRecite, recommendedUnctions, overwritingOverlords };
  };

  // LITERAL PRAYER TEXTS FROM THE PDF RENDERED ON REAL CHECKS!
  const literalPrayers = {
    catolicismo: {
      title: "Oração de Renúncia ao Catolicismo",
      text: "Renuncio a todo o meu envolvimento no Catolicismo; renuncio ao meu batismo na Igreja Católica e renuncio qualquer vinculação do meu nome a qualquer santo católico, desligando espiritualmente esta vinculação; renuncio a minha crisma, catecismo, 1ª comunhão, assistência a missas, hóstias, procissões, imagens, velas. Peço perdão pelo pecado de idolatria e cancelo toda veneração e adoração que dei aos santos católicos. Coloco ainda o sangue de Jesus Cristo e o poder da sua crucificação entre a minha vida e todas as maldições que vieram sobre mim em decorrência desses pecados. Renuncio a todas as velas que acendi para as almas, para anjos da guarda, para mim mesmo, velas de 7 dias; peço perdão por esses pecados, e desligo, em nome de Jesus, todo seu efeito espiritual sobre a minha vida e minha descendência..."
    },
    espiritismo: {
      title: "Oração de Renúncia ao Espiritismo e Feitiçaria",
      text: "Renuncio a todo o meu envolvimento com Kardecismo, Umbanda, Candomblé, Quimbanda, Orederê, Canjerê, Kundelê, Omolokó, Magia Negra e outras linhas da feitiçaria, da macumbaria e do uso de poderes mágicos e ocultos. Em nome de Jesus, renuncio a todas as consagrações que fiz da minha pessoa a quaisquer entidades, e desfaço, espiritualmente, todo pacto com Satanás e seus demônios sobre a minha vida e dos meus descendentes, em decorrência destas consagrações. Renuncio a todos os atos que me comprometeram com qualquer entidade, e atos que invocaram qualquer espírito. Renuncio a todos os rituais que pratiquei, tudo que comi ou bebi em oferecimento às entidades, cantigas que entoei ou giras de incorporação..."
    },
    maconaria: {
      title: "Oração de Renúncia à Maçonaria",
      text: "No nome do Senhor Jesus Cristo, e pela autoridade que possuo como crente nEle, declaro-me redimido da mão do diabo. Pelo sangue de Jesus, foram perdoados todos os meus pecados. Confesso agora que tenho sido culpado do pecado de idolatria na Loja Maçônica... Renuncio a todos os juramentos feitos no altar da Maçonaria, no nome de Jesus e, pelo poder do Seu sangue derramado, eu também me desvencilho de qualquer pecado que acompanha as gerações, e da escravidão que pode estar me oprimindo através dos juramentos feitos pelos meus pais ou ancestrais, e cravo todas estas coisas na cruz de Cristo!"
    },
    novaera: {
      title: "Oração de Renúncia à Nova Era e Práticas Místicas",
      text: "Em nome de Jesus, eu tomo posse da Espada de Glória, que vem diretamente do Trono de Deus, e quebro, desfaço, toda conexão e toda ligação de qualquer ser maligno para com a minha vida. Retiro toda maldade colocada no meu coração, e desfaço a camada de gelo que está sobre ele. Desfaço, em nome de Jesus, a marca na minha testa, na minha mente, e queimo o local com o sangue de Jesus, restaurando a minha mente. Desfaço a marca colocada no meu ouvido esquerdo, e na palma da minha mão direita, declarando que sou livre para louvar ao Único Deus verdadeiro. Em nome de Jesus, amém!"
    }
  };

  const analysis = generateAnalysis();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-neutral-200">
      
      {/* If Report is Generated */}
      {showReport ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-500" /> Relatório Espiritual Finalizado
              </span>
              <h1 className="text-2xl font-sans font-black tracking-tight text-white uppercase mt-1">
                Seu Roteiro de Libertação
              </h1>
            </div>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-2 border border-neutral-700 rounded transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refazer Questionário
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            
            {/* ANALYTICAL OVERVIEW SIDE */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800 flex flex-col gap-3">
                <h3 className="text-sm font-sans font-bold text-neutral-200 uppercase tracking-widest border-b border-neutral-800 pb-1 flex items-center gap-1.5 text-yellow-500">
                  <FileText className="w-4 h-4" /> Perfil do Guerreiro
                </h3>
                <div className="space-y-1 text-xs font-mono">
                  <p><span className="text-neutral-500">Nome:</span> {nome}</p>
                  <p><span className="text-neutral-500">Idade:</span> {idade || 'Não informada'} anos</p>
                  <p><span className="text-neutral-500">Estado Civil:</span> {civil}</p>
                  <p><span className="text-neutral-500">Profissão:</span> {profissao || 'Não informada'}</p>
                  <p><span className="text-neutral-500">Brechas Cadastradas:</span> <span className="text-red-500 font-bold">{checkedItems.length} identificadas</span></p>
                </div>
              </div>

              {/* OVERLORD WARNINGS */}
              {analysis.overwritingOverlords.length > 0 && (
                <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800 flex flex-col gap-3">
                  <h3 className="text-sm font-sans font-bold text-neutral-200 uppercase tracking-widest border-b border-neutral-800 pb-1 flex items-center gap-1.5 text-red-500">
                    <AlertSquare /> Principados Ativos Sugeridos
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Com base nos sentimentos e hábitos selecionados, identificamos que estes principados têm tentáculos espirituais ativos que você deve ordenar a saída imediata:
                  </p>
                  <ul className="space-y-1.5">
                    {analysis.overwritingOverlords.map((o, idx) => (
                      <li key={idx} className="text-xs font-mono font-bold text-neutral-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RECOMMENDED UNCTIONS */}
              {analysis.recommendedUnctions.length > 0 && (
                <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800 flex flex-col gap-3">
                  <h3 className="text-sm font-sans font-bold text-neutral-200 uppercase tracking-widest border-b border-neutral-800 pb-1 flex items-center gap-1.5 text-emerald-400">
                    <Dna className="w-4 h-4" /> Áreas do Corpo Recomendadas
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Vá até a aba de **Orações (Unção Corporal)** e faça as declarações verbais com óleo de unção especificamente para estas partes:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.recommendedUnctions.map((u, idx) => (
                      <span key={idx} className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-[10px] font-mono px-2 py-0.5 rounded-full">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* LITERAL SPECIAL PRAYERS INSIDE REPORT */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 flex flex-col gap-6 max-h-[70vh] overflow-y-auto custom-scroll">
                
                <div className="border-b border-neutral-800 pb-2">
                  <h3 className="text-base font-sans font-black text-white uppercase flex items-center gap-1.5">
                    <Flame className="w-5 h-5 text-red-500" /> Orações de Renúncia Específicas
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 lines-relaxed font-sans">
                    Utilize a autoridade do Nome de Jesus para quebrar cada pacto consanguíneo declarando verbalmente as orações abaixo:
                  </p>
                </div>

                {analysis.prayersToRecite.length > 0 ? (
                  analysis.prayersToRecite.map((prayerKey) => {
                    const pr = literalPrayers[prayerKey as keyof typeof literalPrayers];
                    return (
                      <div key={prayerKey} className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex flex-col gap-3">
                        <span className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest leading-none">
                          DECLARAÇÃO DE COVERTURA
                        </span>
                        <h4 className="text-sm font-sans font-black text-white uppercase border-b border-neutral-800 pb-1 leading-none">
                          {pr.title}
                        </h4>
                        <p className="text-xs italic text-neutral-300 leading-relaxed text-justify select-text">
                          &ldquo;{pr.text}&rdquo;
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-neutral-600 flex flex-col items-center gap-2">
                    <BookOpen className="w-10 h-10" />
                    <p className="text-xs font-mono font-bold uppercase">Nenhuma quebra de aliança consanguínea pendente</p>
                    <p className="text-[10px] max-w-sm text-neutral-500 font-sans mt-1">
                      Parabéns! Seus checks não mostraram elos hereditários diretos com religiões sincréticas tradicionais. Recomendamos seguir com as orações de limpeza gerais diárias.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
          
          {/* Step Progress bar */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <Dna className="w-6 h-6 text-red-500" />
              <h1 className="text-lg sm:text-xl font-sans font-black tracking-tight uppercase">
                Diagnóstico de Libertação
              </h1>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400">
              Passo {step} de 4
            </span>
          </div>

          <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-red-600 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          <div className="min-h-[300px]">
            {/* STEP 1: Personal Data */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase">Dados Pessoais do Proponente</h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Identifique-se para cruzar os dados de sua quebra de forma privativa.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">Nome Completo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Lucas Lessa"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">Sexo</label>
                    <select
                      value={sexo}
                      onChange={(e) => setSexo(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 font-mono"
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">Idade</label>
                    <input
                      type="number"
                      value={idade}
                      onChange={(e) => setIdade(e.target.value)}
                      placeholder="Ex: 25"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">Estado Civil</label>
                    <select
                      value={civil}
                      onChange={(e) => setCivil(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 font-mono"
                    >
                      <option value="Solteiro">Solteiro(a)</option>
                      <option value="Casado">Casado(a)</option>
                      <option value="Divorciado">Divorciado(a)</option>
                      <option value="Viuvo">Viúvo(a)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <label className="text-xs font-mono text-neutral-400 font-bold uppercase">Profissão Ativa</label>
                  <input
                    type="text"
                    value={profissao}
                    onChange={(e) => setProfissao(e.target.value)}
                    placeholder="Ex: Engenheiro de Software"
                    className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Text relationship questions */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4 text-justify"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase">Histórico e Relacionamentos</h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Discorra em poucas palavras sobre as circunstâncias emocionais e familiares.</p>
                </div>

                <div className="space-y-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">1. Como está seu relacionamento familiar? (esposa, esposo, filhos)</label>
                    <textarea
                      value={relacionamentoFamiliar}
                      onChange={(e) => setRelacionamentoFamiliar(e.target.value)}
                      placeholder="Escreva livremente..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs sm:text-sm text-neutral-200 min-h-[70px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">2. Como é o seu relacionamento com seus pais?</label>
                    <textarea
                      value={relacionamentoPais}
                      onChange={(e) => setRelacionamentoPais(e.target.value)}
                      placeholder="Ex: Distante, conflituoso, amoroso, etc..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs sm:text-sm text-neutral-200 min-h-[70px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">3. Você se lembra de traumas marcantes do passado/infância? Quais?</label>
                    <textarea
                      value={traumasPassado}
                      onChange={(e) => setTraumasPassado(e.target.value)}
                      placeholder="Abusos sexuais, rejeição profunda no ventre, acidentes, ausência paterna..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs sm:text-sm text-neutral-200 min-h-[70px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Heranças Checkboxes */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase">Heranças & Alianças de Linhagem</h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Selecione todos os itens que estiveram ativos em sua história familiar consanguínea ou de seus antepassados.</p>
                </div>

                {/* Subsections of Step 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  
                  {/* Category A */}
                  <div className="flex flex-col gap-3 bg-neutral-950 p-4 border border-neutral-800/80 rounded-lg">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" /> Maldições Familiares Comuns
                    </h3>
                    <div className="space-y-2">
                      {maldiçõesFamiliares.map((item) => (
                        <label key={item} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-600 rounded cursor-pointer w-4 h-4"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category B */}
                  <div className="flex flex-col gap-3 bg-neutral-950 p-4 border border-neutral-800/80 rounded-lg">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-red-500" /> Envolvimento com Seitas/Religiões
                    </h3>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scroll">
                      {religioesSeitas.map((item) => (
                        <label key={item} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-600 rounded cursor-pointer w-4 h-4"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 4: Symptoms and Attitudes Checkboxes */}
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase">Sentimentos e Sintomas Ativos</h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Selecione todos os sintomas físicos ou impulsos de caráter sentimentais que você sente de forma crônica no seu cotidiano.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  
                  {/* Category A */}
                  <div className="flex flex-col gap-3 bg-neutral-950 p-4 border border-neutral-800/80 rounded-lg">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-red-500" /> Habilidades e Sentimentos Ativos
                    </h3>
                    <div className="space-y-2">
                      {sentimentosAtitudes.map((item) => (
                        <label key={item} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-600 rounded cursor-pointer w-4 h-4"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category B */}
                  <div className="flex flex-col gap-3 bg-neutral-950 p-4 border border-neutral-800/80 rounded-lg">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" /> Sintomas Físicos sem Causa Médica
                    </h3>
                    <div className="space-y-2">
                      {sintomasFisicos.map((item) => (
                        <label key={item} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-600 rounded cursor-pointer w-4 h-4"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Traumatic Warning on text contents */}
                <div className="bg-red-950/20 border border-red-800/30 p-4 rounded flex items-start gap-3 mt-1">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col text-justify">
                    <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wide leading-none">Aviso de Integridade</span>
                    <p className="text-[10px] text-neutral-400 font-sans leading-relaxed mt-1">
                      As escrituras afirmam em 1 Jo 1:9 que o arrependimento do pecado é a base legal de toda libertação. 
                      O diagnóstico serve para mapear as suas brechas para unção; nenhum dado é enviado para servidores externos. Tudo é persistido estritamente no seu localStorage navegador.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}
          </div>

          {/* Stepper Footer Buttons */}
          <div className="flex items-center justify-between border-t border-neutral-800 pt-5 mt-6">
            <div>
              {step > 1 && (
                <button
                  onClick={() => setStep(prev => prev - 1)}
                  className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 px-3 py-2 rounded transition-all select-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              )}
            </div>

            <div>
              {step < 4 ? (
                <button
                  onClick={() => setStep(prev => prev + 1)}
                  disabled={step === 1 && !nome}
                  className="flex items-center gap-1 text-xs font-mono bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer uppercase font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                >
                  Avançar <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1 text-xs font-mono bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded transition-all active:scale-95 select-none cursor-pointer uppercase font-extrabold shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" /> Gerar Roteiro Personalizado
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

// Small mock subcomponent inside to prevent import errors
function AlertSquare() {
  return <AlertCircle className="w-4 h-4 text-red-500" />;
}
