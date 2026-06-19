/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, Flame, FileText, CheckSquare, HeartHandshake, Sparkles, 
  ChevronRight, ChevronLeft, Info, RefreshCw, BookOpen, AlertCircle,
  Search, ShieldAlert, Heart, Calendar, MapPin, Phone, HelpCircle, Copy, Check
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
  const [copied, setCopied] = useState<boolean>(false);

  // SECTION 1 & 2: Form States (Saved / Default initialization)
  const [nome, setNome] = useState(progress.questionnaireResponse?.personalData?.nome || '');
  const [sexo, setSexo] = useState(progress.questionnaireResponse?.personalData?.sexo || 'M');
  const [idade, setIdade] = useState(progress.questionnaireResponse?.personalData?.idade || '');
  const [endereco, setEndereco] = useState(progress.questionnaireResponse?.personalData?.endereco || '');
  const [bairro, setBairro] = useState(progress.questionnaireResponse?.personalData?.bairro || '');
  const [cidade, setCidade] = useState(progress.questionnaireResponse?.personalData?.cidade || '');
  const [fone, setFone] = useState(progress.questionnaireResponse?.personalData?.fone || '');
  const [estadoCivil, setEstadoCivil] = useState(progress.questionnaireResponse?.personalData?.estadoCivil || 'Solteiro');
  const [numFilhos, setNumFilhos] = useState(progress.questionnaireResponse?.personalData?.numFilhos || '');
  const [profissao, setProfissao] = useState(progress.questionnaireResponse?.personalData?.profissao || '');
  const [escolaridade, setEscolaridade] = useState(progress.questionnaireResponse?.personalData?.escolaridade || '');

  const [religiaoAnterior, setReligiaoAnterior] = useState(progress.questionnaireResponse?.personalData?.religiaoAnterior || '');
  const [tempoConvertido, setTempoConvertido] = useState(progress.questionnaireResponse?.personalData?.tempoConvertido || '');
  const [tempoBatismo, setTempoBatismo] = useState(progress.questionnaireResponse?.personalData?.tempoBatismo || '');
  const [jaUsouDrogas, setJaUsouDrogas] = useState(progress.questionnaireResponse?.personalData?.jaUsouDrogas || 'Não');
  const [tinhaVicios, setTinhaVicios] = useState(progress.questionnaireResponse?.personalData?.tinhaVicios || '');
  const [tomaMedicamentos, setTomaMedicamentos] = useState(progress.questionnaireResponse?.personalData?.tomaMedicamentos || 'Não');
  const [paraQueMedicamentos, setParaQueMedicamentos] = useState(progress.questionnaireResponse?.personalData?.paraQueMedicamentos || '');
  const [saudeHoje, setSaudeHoje] = useState(progress.questionnaireResponse?.personalData?.saudeHoje || '');
  const [desequilibriosEmocionais, setDesequilibriosEmocionais] = useState(progress.questionnaireResponse?.personalData?.desequilibriosEmocionais || '');
  const [fezTerapia, setFezTerapia] = useState(progress.questionnaireResponse?.personalData?.fezTerapia || '');

  // SECTION 3, 4, 5, 6: Checklists Selected
  const [checkedItems, setCheckedItems] = useState<string[]>(
    progress.questionnaireResponse?.checkedItems || []
  );

  // Text answers for Questions 1-5 & Q10-26 (saved as custom keys in textAnswers record)
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>(
    progress.questionnaireResponse?.textAnswers || {}
  );

  // Search filter specifically for Category 9 (Massive state feelings list)
  const [feelingsSearch, setFeelingsSearch] = useState<string>('');
  const [feelingsFilter, setFeelingsFilter] = useState<'all' | 'checked'>('all');

  const toggleItem = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(prev => prev.filter(x => x !== item));
    } else {
      setCheckedItems(prev => [...prev, item]);
    }
  };

  const handleTextAnswerChange = (questionKey: string, value: string) => {
    setTextAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  // CHECKBOX OPTIONS COLLECTIONS FROM THE QUESTIONNAIRE PDF
  const maldicoesFamiliares = [
    'idolatrias', 'doenças físicas', 'doenças emocionais', 'feitiçarias',
    'participação em seitas/ocultismos', 'pecados conjugais', 'mortes/suicídios',
    'pecados sexuais', 'abortos', 'maçonaria', 'rebelião', 'vícios',
    'doenças mentais', 'violência física', 'miséria, pobreza', 'bancarrota financeira',
    'espiritualismos, consulta a mortos'
  ];

  const religioesSeitas = [
    'catolicismo', 'budismo', 'kardecismo', 'islamismo', 'brahamanismo',
    'candomblé', 'nova era', 'catimbó', 'ciência cristã', 'test.Jeová',
    'seicho-no-iê', 'racionalismo', 'rosa cruz', 'hare-krishna', 'messiânica',
    'ateísmo', 'unificação', 'taoísmo', 'umbanda', 'quimbanda', 'hinduísmo',
    'santo daime', 'maçonaria', 'shintoísmo', 'magia negra', 'mórmons', 'tantrismo'
  ];

  const atividadesMisticas = [
    'pirâmide', 'poder da mente', 'do-in', 'tai-chi-chuan', 'ufologia',
    'regressão', 'pró-vida', 'aromaterapia', 'minerioterapia', 'ervas',
    'artes marciais', 'cartomancia', 'cristais', 'perfect liberty', 'yoga',
    'cromoterapia', 'gnose', 'sintonia', 'florais de bach', 'parapsicologia',
    'ikebana', 'hipnose', 'relaxamento mental'
  ];

  const sentimentosAtitudes = [
    'abatimentos', 'agressividades', 'adivinhações', 'blasfêmias', 'ciúmes', 'culpas',
    'conversas sujas', 'auto compaixão', 'depressões', 'descompromissos', 'deslealdades',
    'doenças(fobias)', 'discussões', 'dúvidas', 'enfermidades', 'fantasias', 'esquizofrenias',
    'heresias', 'homossexualismo/lesbianismo', 'impotência sexual', 'inaptidão', 'indecisões',
    'apetite descontrolado', 'autopunição', 'cansaço anormal', 'cobiças', 'dificuldade de fazer amigos',
    'desejo de domínio', 'egoísmos', 'enfado, exaustão, fadiga', 'exibicionismos', 'fingimentos',
    'amarguras', 'bancarrotas', 'distrações', 'frigidez', 'angústias', 'hiperatividade',
    'indisciplinas', 'incesto', 'indiferença', 'adultério', 'ansiedade', 'arrogância',
    'auto rejeição', 'bloqueios na mente', 'competição', 'choros descontrolados', 'covardias',
    'desânimos', 'desesperos', 'difamações', 'drogas', 'encobrir faltas, não assumir',
    'espiritualismos', 'falsidades', 'heranças espirituais negativas', 'ganâncias', 'hipocrisias',
    'idolatrias', 'inferioridade', 'inconsistências', 'inseguranças/inconstâncias', 'alucinações',
    'insubmissões', 'autoacusações', 'autossuficiências', 'brigas', 'vícios (cigarro, bebida, jogo)',
    'confusões', 'críticas', 'procrastinações', 'desatenção', 'desgostos', 'desejo de matar',
    'dificuldade de amar', 'esquecimentos', 'fornicação/prostituição', 'glutonarias', 'histerias',
    'heranças físicas/anomalias', 'impaciências', 'incredulidades', 'infidelidades a Deus',
    'insanidades', 'intolerâncias', 'mágoas', 'medos diversos', 'mentiras', 'medo de falhar ou fracassar',
    'medo de rejeição', 'ocultismos', 'perturbações', 'possessividade', 'pesadelos',
    'racionalizações', 'ressentimentos', 'sadismos', 'teimosias', 'vinganças', 'insônias',
    'lembranças negativas', 'invejas', 'opressões', 'mal estar geral', 'medo de autoridade',
    'medo de acidentes', 'sensação de morte', 'passividades', 'preocupações excessivas',
    'preguiças', 'racismos', 'pensamentos impuros', 'remédios (compulsão)', 'sensibilidade excessiva',
    'sonhos eróticos', 'violências', 'tiques nervosos', 'instabilidades', 'iras', 'medo de casar',
    'medo de morrer', 'loucuras', 'medo do futuro', 'malícias', 'nervosismos', 'orgulho',
    'pessimismos', 'pressões', 'pactos satânicos', 'raivas', 'roer unhas', 'simpatias',
    'tristezas crônicas', 'suicídios', 'insubmissão a superiores', 'intelectualismos', 'machismo',
    'masturbações', 'medo de estar só', 'melancolias', 'paixões descontroladas', 'ódios',
    'pornografias', 'medo de dar o dízimo', 'palavrões', 'rebeldias', 'superstições', 'roubos',
    'timidez', 'vergonha', 'zombaria', 'hábitos nervosos', 'heranças mentais negativas',
    'resistência a desfazer-se de coisas erradas', 'solidão', 'curiosidade por coisas mórbidas',
    'derrotas', 'dores crônicas de cabeça', 'dificuldade de perdoar', 'corpo e mente pesados',
    'curiosidade por coisas erradas', 'desconfianças', 'desleixo com a aparência', 'frustrações',
    'heranças emocionais negativas', 'dificuldade de concentração para ler a Bíblia, orar ou louvar a Deus',
    'resistência a envolver-se mais com Deus e com a Igreja', 'manias (acusar, doença, perfeição, perseguição, mentir, roubar, etc)'
  ];

  // Specific symptoms checklist under Question 16
  const subSintomasFisicos = [
    'choques no corpo', 'apertos na cabeça ou nos olhos', 'sono incontrolável',
    'tonturas, vertigens, desmaios', 'dores que "andam" no corpo', 'vômitos'
  ];

  // Filter Category 9 feelings dynamically based on search & state selection
  const filteredFeelings = useMemo(() => {
    return sentimentosAtitudes.filter(item => {
      const matchesSearch = item.toLowerCase().includes(feelingsSearch.toLowerCase());
      if (feelingsFilter === 'checked') {
        return matchesSearch && checkedItems.includes(item);
      }
      return matchesSearch;
    });
  }, [feelingsSearch, feelingsFilter, checkedItems]);

  const handleSubmit = () => {
    const updated: UserProgress = {
      ...progress,
      questionnaireResponse: {
        personalData: { 
          nome, sexo, idade, endereco, bairro, cidade, fone, estadoCivil, 
          numFilhos, profissao, escolaridade, religiaoAnterior, tempoConvertido, 
          tempoBatismo, jaUsouDrogas, tinhaVicios, tomaMedicamentos, 
          paraQueMedicamentos, saudeHoje, desequilibriosEmocionais, fezTerapia
        },
        checkedItems,
        textAnswers
      }
    };
    onSaveProgress(updated);
    setShowReport(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setNome(''); setSexo('M'); setIdade(''); setEndereco(''); setBairro(''); setCidade('');
    setFone(''); setEstadoCivil('Solteiro'); setNumFilhos(''); setProfissao(''); setEscolaridade('');
    setReligiaoAnterior(''); setTempoConvertido(''); setTempoBatismo(''); setJaUsouDrogas('Não');
    setTinhaVicios(''); setTomaMedicamentos('Não'); setParaQueMedicamentos(''); setSaudeHoje('');
    setDesequilibriosEmocionais(''); setFezTerapia('');
    setCheckedItems([]);
    setTextAnswers({});
    
    const updated = { ...progress, questionnaireResponse: undefined };
    onSaveProgress(updated);
    setShowReport(false);
    setStep(1);
  };

  // ANALYSIS REPORT GENERATOR: Cross-evaluates options to build rich recommendations
  const generateAnalysis = () => {
    const alerts = [];
    const recommendedPrayers = [];
    const affectedSpiritualAreas = [];
    const bodyUnctions = ['Cabeça']; // default coronário for mind protection

    // Determine specific alerts based on options
    if (checkedItems.includes('catolicismo')) {
      alerts.push({
        title: 'Aliança Ancestral Católica (Sacrementos / Idolatria)',
        desc: 'Detectado consagração na Igreja de Roma. Recomenda-se realizar a oração verbal de renúncia aos batismos, procissões, santos consagrados e velas acesas pelas almas no purgatório.'
      });
      recommendedPrayers.push('Catolicismo');
    }

    if (checkedItems.includes('kardecismo') || checkedItems.includes('umbanda') || checkedItems.includes('candomblé') || checkedItems.includes('quimbanda') || checkedItems.includes('magia negra') || checkedItems.includes('catimbó')) {
      alerts.push({
        title: 'Vínculos Sincréticos e Espiritismo de Incorporação',
        desc: 'Consultas, trabalhos, passes ou consumo de alimentos sagrados voltados a guias/orixás. Isto confere direitos cismáticos a demônios personificadores (espíritos familiares).'
      });
      recommendedPrayers.push('Ocultismo & Feitiçaria');
      bodyUnctions.push('Umbilical (ligação com o ventre materno)', 'Mãos (atos praticados)');
    }

    if (checkedItems.includes('maçonaria')) {
      alerts.push({
        title: 'Juramentos Blindados Consanguíneos (Maçonaria)',
        desc: 'Juramentos com segredo sob pena de morte trazem amarras financeiras e males crônicos nos olhos/cérebro à descendência até a 10ª geração.'
      });
      recommendedPrayers.push('Maçonaria');
      bodyUnctions.push('Garganta (juramentos)', 'Olhos (venda maçônica)');
    }

    if (checkedItems.includes('nova era') || checkedItems.includes('poder da mente') || checkedItems.includes('regressão') || checkedItems.includes('yoga') || checkedItems.includes('hipnose')) {
      alerts.push({
        title: 'Pactos com Auto-suficiência Mística',
        desc: 'Técnicas de regressão, energias elementares ou expansão mental buscam destronar a Graça Redentora. Recomenda-se renúncia de marcas ocultas aplicadas no ouvido esquerdo e mente.'
      });
      recommendedPrayers.push('Nova Era & Práticas Astrológicas');
    }

    // Evaluate answers to specific Q10-Q26 questions
    if (textAnswers['q10'] === 'Sim') {
      alerts.push({
        title: 'Impulso Opressivo de Amaldiçoamento',
        desc: 'Desejos compulsivos de amaldiçoar os pais ou Deus revelam investidas do arquidemônio de rebelião e difamação direta.'
      });
    }

    if (textAnswers['q11'] === 'Sim' || checkedItems.includes('dificuldade de concentração para ler a Bíblia, orar ou louvar a Deus')) {
      alerts.push({
        title: 'Repulsa Espiritual ou Bloqueio Cognitivo de Luz',
        desc: 'Barreiras incomuns para ler escrituras ou orrar mostram resistência cega forjada por potestades que cegam o entendimento.'
      });
      bodyUnctions.push('Ouvidos (bloqueio auditivo)', 'Olhos (bloqueio visual)');
    }

    if (textAnswers['q12'] === 'Sim' || checkedItems.includes('suicídios') || checkedItems.includes('mortes/suicídios')) {
      alerts.push({
        title: 'Investidas de Legiões Destrutivas / Autodecomposição',
        desc: 'Pensamentos de homicídio ou suicídio requerem imposição imediata de limites no Sangue de Jesus com ajuda de conselheiro pastoral.'
      });
      affectedSpiritualAreas.push('Retaliação e Omissão Espiritual de Autopreservação');
    }

    // Evaluate feelings active
    const emotionalHold = checkedItems.filter(x => sentimentosAtitudes.includes(x));
    if (emotionalHold.length > 8) {
      affectedSpiritualAreas.push('Opressor Emocional de Damian (Melancolia, Culpa e Tristeza Crônica)');
      bodyUnctions.push('Coração/Peito (recolhimento de mágoas)');
    }

    // Q16 evaluation for unctions
    if (textAnswers['q16'] === 'Sim') {
      subSintomasFisicos.forEach(sym => {
        if (checkedItems.includes(sym)) {
          if (sym === 'apertos na cabeça ou nos olhos') bodyUnctions.push('Testa / Região Frontal');
          if (sym === 'choques no corpo' || sym === 'dores que "andam" no corpo') bodyUnctions.push('Coluna Vertebral e Articulações');
          if (sym === 'sono incontrolável') bodyUnctions.push('Pálpebras (espírito do sono e letargia)');
        }
      });
    }

    // Remove duplicates from body unctions
    const finalUnctions = Array.from(new Set(bodyUnctions));

    return { alerts, recommendedPrayers, affectedSpiritualAreas, finalUnctions };
  };

  const copyToClipboard = () => {
    const analysisObj = generateAnalysis();
    
    let text = `============================================\n`;
    text += `  DIAGNÓSTICO E QUEBRA DE MALDIÇÕES\n`;
    text += `============================================\n\n`;
    text += `DADOS CADASTRAIS:\n`;
    text += `- Nome: ${nome}\n`;
    text += `- Sexo: ${sexo === 'M' ? 'Masculino' : 'Feminino'} | Idade: ${idade || 'N/I'} anos\n`;
    text += `- Endereço: ${endereco || 'N/I'}, ${bairro || 'N/I'} - ${cidade || 'N/I'}\n`;
    text += `- Fone: ${fone || 'N/I'} | Estado Civil: ${estadoCivil}\n`;
    text += `- Filhos: ${numFilhos || '0'} | Escolaridade: ${escolaridade || 'N/I'}\n`;
    text += `- Religião Anterior: ${religiaoAnterior || 'Nenhuma'}\n`;
    text += `- Convertido há: ${tempoConvertido || 'N/I'} | Batizado há: ${tempoBatismo || 'N/I'}\n\n`;
    
    text += `MALDIÇÕES & HISTÓRICO SELECIONADOS:\n`;
    checkedItems.forEach(item => {
      text += `[X] ${item}\n`;
    });
    text += `\nRESPOSTAS DAS PERGUNTAS TEOLÓGICAS DE LIBERTAÇÃO:\n`;
    text += `Q1 (Rel. Familiar): ${textAnswers['q1'] || 'N/I'}\n`;
    text += `Q2 (Motivos da Busca): ${textAnswers['q2'] || 'N/I'}\n`;
    text += `Q3 (Rel. com Pais): ${textAnswers['q3'] || 'N/I'}\n`;
    text += `Q4 (Traumas Passados): ${textAnswers['q4'] || 'N/I'}\n`;
    text += `Q5 (Palavras Malditas): ${textAnswers['q5'] || 'N/I'}\n`;
    text += `Q10 (Compulsão p/ amaldiçoar): ${textAnswers['q10'] || 'Não'}\n`;
    text += `Q11 (Repulsa bíblia): ${textAnswers['q11'] || 'Não'}\n`;
    text += `Q12 (Desejo Suicídio): ${textAnswers['q12'] || 'Não'}\n`;
    text += `Q13 (Amargura sem motivo): ${textAnswers['q13'] || 'Não'}\n`;
    text += `Q14 (Compulsão por atos alheios): ${textAnswers['q14'] || 'Não'}\n`;
    text += `Q15 (Atacar com críticas): ${textAnswers['q15'] || 'Não'}\n`;
    text += `Q16 (Sintomas físicos e choques): ${textAnswers['q16'] || 'Não'}\n`;
    text += `Q17 (Falta de vontade de viver): ${textAnswers['q17'] || 'Não'}\n`;
    text += `Q18 (Pânico ou pavor): ${textAnswers['q18'] || 'Não'}\n`;
    text += `Q19 (Pesadelos recorrentes): ${textAnswers['q19'] || 'Não'}\n`;
    text += `Q20 (Fúria incontrolável): ${textAnswers['q20'] || 'Não'}\n`;
    text += `Q21 (Dúvida de salvação): ${textAnswers['q21'] || 'Não'}\n`;
    text += `Q22 (Culpa excessiva): ${textAnswers['q22'] || 'Não'}\n`;
    text += `Q23 (Abrasamento carnal): ${textAnswers['q23'] || 'Não'}\n`;
    text += `Q24 (Sentir vultos/presenças): ${textAnswers['q24'] || 'Não'}\n`;
    text += `Q25 (Alucinações): ${textAnswers['q25'] || 'Não'}\n`;
    text += `Q26 (Medo do escuro ou isolamento): ${textAnswers['q26'] || 'Não'}\n\n`;

    text += `RECOMENDAÇÕES PASTORAIS:\n`;
    text += `- Orações recomendadas: ${analysisObj.recommendedPrayers.join(', ') || 'Limpeza geral habitual'}\n`;
    text += `- Aplicação com óleo: ${analysisObj.finalUnctions.join(', ') || 'Coronário (Cabeça)'}\n`;
    text += `\n"Para isto se manifestou o Filho de Deus: para destruir as obras do diabo!" (1 João 3:8)\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
                <Sparkles className="w-4 h-4 text-yellow-500" /> Relatório Consolidado de Diagnóstico
              </span>
              <h1 className="text-2xl font-sans font-black tracking-tight text-white uppercase mt-1">
                Mapeamento das Obras Espirituais
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs font-mono font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-100 px-3 py-2 border border-neutral-700 rounded transition-all cursor-pointer"
                title="Copiar relatório formatado para oração"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copiar Roteiro
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono font-bold bg-red-950/40 hover:bg-neutral-800 text-red-400 px-3 py-2 border border-red-900/40 hover:border-neutral-700 rounded transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refazer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            
            {/* LEFT COLUMN: Profiler & Unctions */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800/80 flex flex-col gap-3">
                <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-wider border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Perfil do Fiel
                </h3>
                <div className="space-y-1.5 text-xs font-mono text-neutral-300">
                  <p><span className="text-neutral-500">Nome:</span> {nome}</p>
                  <p><span className="text-neutral-500">Idade:</span> {idade || 'Não informada'} anos | <span className="text-neutral-500">Sexo:</span> {sexo}</p>
                  <p><span className="text-neutral-500">Endereço:</span> {endereco || 'Não informado'}</p>
                  <p><span className="text-neutral-500">Fone:</span> {fone || 'Não informado'} | <span className="text-neutral-500">Filhos:</span> {numFilhos || '0'}</p>
                  <p><span className="text-neutral-500">Conversão/Batismo:</span> {tempoConvertido || 'N/I'} / {tempoBatismo || 'N/I'}</p>
                  <p><span className="text-neutral-500">Brechas de Hereditariedade:</span> <span className="text-red-500 font-bold">{checkedItems.length} detectadas</span></p>
                </div>
              </div>

              {/* RECOMMENDED UNCTION LOCATIONS */}
              <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800/80 flex flex-col gap-3">
                <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                  <Dna className="w-4 h-4" /> Áreas do Corpo P/ Unção Oral
                </h3>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed text-justify">
                  Sugerimos ungir com azeite consagrado as seguintes partes físicas específicas para quebrar a retenção celular e as heranças sensoriais de pecado:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.finalUnctions.map((unc, idx) => (
                    <span key={idx} className="bg-neutral-900 border border-neutral-850 text-neutral-200 text-[10px] font-mono px-2.5 py-1 rounded">
                      • {unc}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTIVE THREATS/LEGIES */}
              {analysis.affectedSpiritualAreas.length > 0 && (
                <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800/80 flex flex-col gap-3">
                  <h3 className="text-xs font-mono font-bold text-red-500 uppercase tracking-wider border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Fortalezas de Resistência
                  </h3>
                  <ul className="space-y-1.5">
                    {analysis.affectedSpiritualAreas.map((area, key) => (
                      <li key={key} className="text-xs font-mono text-neutral-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Actionable Alerts */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-neutral-950 p-5 sm:p-6 rounded-lg border border-neutral-800/80 flex flex-col gap-5 max-h-[75vh] overflow-y-auto custom-scroll">
                <div className="border-b border-neutral-800 pb-2">
                  <h3 className="text-sm font-sans font-black text-white uppercase flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-500 animate-pulse" /> Brechas e Legitimidades Relevantes
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-sans">
                    Aqui estão as suas áreas de legalidade mapeadas sob as heranças consanguíneas confessadas:
                  </p>
                </div>

                {analysis.alerts.length > 0 ? (
                  <div className="space-y-4">
                    {analysis.alerts.map((al, idx) => (
                      <div key={idx} className="bg-neutral-900 border border-neutral-850/80 hover:border-neutral-800 p-4 rounded-lg flex flex-col gap-2">
                        <span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest leading-none">
                          Fator de Opressão #{idx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-sans font-black text-white uppercase">
                          {al.title}
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed text-justify font-sans select-text">
                          {al.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-neutral-600 flex flex-col items-center gap-3">
                    <BookOpen className="w-12 h-12" />
                    <p className="text-xs font-mono font-bold uppercase tracking-wider">Aura Hereditária Limpa</p>
                    <p className="text-[10px] max-w-sm text-neutral-500 font-sans">
                      Seus checks não demonstraram elos ancestrais patológicos graves. No entanto, persista na quebra de pensamentos de derrota diários.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Scripture Verse Card on Footer Summary */}
          <div className="bg-neutral-950 border border-neutral-800/60 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4 text-center sm:text-left">
            <span className="text-[11px] font-sans text-neutral-400 italic">
              "Para isto se manifestou o Filho de Deus: para destruir as obras do diabo!"
            </span>
            <span className="text-[10px] font-mono font-bold text-red-500">
              1 João 3:8 • Quebra de Maldições
            </span>
          </div>

        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative">
          
          {/* STEP HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-sans font-black tracking-tight uppercase text-white">
                Ficha Geral de Diagnóstico Clínico-Espiritual
              </h1>
            </div>
            <span className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest">
              Passo {step} de 6
            </span>
          </div>

          <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-red-650 h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>

          {/* STEP INTERFACES */}
          <div className="min-h-[400px] py-2">
            
            {/* STEP 1: Personal Profile Data */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5 text-justify"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" /> 1. Dados Pessoais do Proponente
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Preencha cuidadosamente seus dados cadastrais fundamentais.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Nome Completo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Identificação nominal"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Sexo</label>
                    <select
                      value={sexo}
                      onChange={(e) => setSexo(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 font-mono"
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Idade</label>
                    <input
                      type="number"
                      value={idade}
                      onChange={(e) => setIdade(e.target.value)}
                      placeholder="Anos"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Endereço Residencial</label>
                    <input
                      type="text"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="Rua, Número..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Bairro</label>
                    <input
                      type="text"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Cidade / UF</label>
                    <input
                      type="text"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Telefone de Contato</label>
                    <input
                      type="tel"
                      value={fone}
                      onChange={(e) => setFone(e.target.value)}
                      placeholder="(XX) XXXXX-XXXX"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Estado Civil</label>
                    <select
                      value={estadoCivil}
                      onChange={(e) => setEstadoCivil(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 font-mono"
                    >
                      <option value="Solteiro">Solteiro(a)</option>
                      <option value="Casado">Casado(a)</option>
                      <option value="Divorciado">Divorciado(a)</option>
                      <option value="Viuvo">Viúvo(a)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Nº de Filhos</label>
                    <input
                      type="number"
                      value={numFilhos}
                      onChange={(e) => setNumFilhos(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Profissão</label>
                    <input
                      type="text"
                      value={profissao}
                      onChange={(e) => setProfissao(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Escolaridade</label>
                    <input
                      type="text"
                      value={escolaridade}
                      onChange={(e) => setEscolaridade(e.target.value)}
                      placeholder="Ex: Superior Completo"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Background history and habits */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5 text-justify"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-500" /> 2. Histórico Eclesiástico & Medicamentos
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Informe seu histórico de crença e saúde atual.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Religião antes de ser evangélico</label>
                    <input
                      type="text"
                      value={religiaoAnterior}
                      onChange={(e) => setReligiaoAnterior(e.target.value)}
                      placeholder="Ex: Católico, espírita, ateu..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Tempo de convertido</label>
                    <input
                      type="text"
                      value={tempoConvertido}
                      onChange={(e) => setTempoConvertido(e.target.value)}
                      placeholder="Ex: 3 anos"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Tempo de batismo</label>
                    <input
                      type="text"
                      value={tempoBatismo}
                      onChange={(e) => setTempoBatismo(e.target.value)}
                      placeholder="Ex: 2 anos"
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Já usou drogas?</label>
                    <select
                      value={jaUsouDrogas}
                      onChange={(e) => setJaUsouDrogas(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 font-mono"
                    >
                      <option value="Não">Não</option>
                      <option value="Sim, no passado">Sim, no passado</option>
                      <option value="Sim, uso ativo">Sim, de forma ativa</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Tinha vícios? Quais?</label>
                    <input
                      type="text"
                      value={tinhaVicios}
                      onChange={(e) => setTinhaVicios(e.target.value)}
                      placeholder="Cigarro, bebida, jogos, pornografia, etc..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Toma medicamentos controlado?</label>
                    <select
                      value={tomaMedicamentos}
                      onChange={(e) => setTomaMedicamentos(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 font-mono"
                    >
                      <option value="Não">Não</option>
                      <option value="Sim">Sim</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Se sim, quais fármacos e para o que prescreve?</label>
                    <input
                      type="text"
                      value={paraQueMedicamentos}
                      onChange={(e) => setParaQueMedicamentos(e.target.value)}
                      placeholder="Ansiolíticos, antidepressivos, pressão alta, etc..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Como está sua saúde física hoje?</label>
                    <input
                      type="text"
                      value={saudeHoje}
                      onChange={(e) => setSaudeHoje(e.target.value)}
                      placeholder="Dores recorrentes, estômago livre, cansaço..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Desequilíbrios emocionais fortes?</label>
                    <input
                      type="text"
                      value={desequilibriosEmocionais}
                      onChange={(e) => setDesequilibriosEmocionais(e.target.value)}
                      placeholder="Acessos de fúria repentinos, depressão profunda..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Feito terapia ou tratados psicológicos?</label>
                    <input
                      type="text"
                      value={fezTerapia}
                      onChange={(e) => setFezTerapia(e.target.value)}
                      placeholder="Internações, psicoterapia..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Written reflexions Q1-5 */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5 text-justify"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-red-500" /> 3. Investigação de Traumas & Heranças
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Explane em síntese as circunstâncias familiares mais profundas.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">
                      Q1. Como está seu relacionamento familiar? (esposa, esposo, filhos):
                    </label>
                    <textarea
                      value={textAnswers['q1'] || ''}
                      onChange={(e) => handleTextAnswerChange('q1', e.target.value)}
                      placeholder="Conflitos, harmonia, divórcios iminentes..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 min-h-[60px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">
                      Q2. Em sua opinião, quais os principais motivos para fazer quebra de maldições?
                    </label>
                    <textarea
                      value={textAnswers['q2'] || ''}
                      onChange={(e) => handleTextAnswerChange('q2', e.target.value)}
                      placeholder="Desejo libertação financeira, pacificação do casamento, quebra de heranças negativas..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 min-h-[60px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">
                      Q3. Em rápidas palavras, como é o seu relacionamento com seus pais?
                    </label>
                    <textarea
                      value={textAnswers['q3'] || ''}
                      onChange={(e) => handleTextAnswerChange('q3', e.target.value)}
                      placeholder="Amoroso, com ressentimentos arquivados, abandonônico, com honra ativa..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 min-h-[60px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">
                      Q4. Lembra-se de traumas marcantes ocorridos no seu passado?
                    </label>
                    <textarea
                      value={textAnswers['q4'] || ''}
                      onChange={(e) => handleTextAnswerChange('q4', e.target.value)}
                      placeholder="Abusos físicos ou sexuais, humilhações na infância, acidentes de quase morte..."
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 min-h-[60px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-neutral-400 font-bold uppercase">
                      Q5. Escreva palavras de maldições explícitas que você recebeu ao longo de sua vida:
                    </label>
                    <textarea
                      value={textAnswers['q5'] || ''}
                      onChange={(e) => handleTextAnswerChange('q5', e.target.value)}
                      placeholder='Ex: "Você nunca vai dar em nada", "Você é burro", amaldiçoamentos de pais ou cônjuge...'
                      className="bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-neutral-200 min-h-[60px] focus:outline-none focus:border-neutral-700 font-sans"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Ancestral check (Q6, 7 & 8) */}
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase flex items-center gap-2">
                    <Flame className="w-4 h-4 text-red-500 animate-pulse" /> 4. Heranças, Seitas & Envolvimentos Místicos
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Selecione todas as práticas que estiveram presentes em sua vida ou de seus antepassados.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* Category 6: Maldições familiares */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col gap-3">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Q6. Maldições Familiares Comuns
                    </h3>
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scroll">
                      {maldicoesFamiliares.map(item => (
                        <label key={item} className="flex items-center gap-2 text-[11px] text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-650 rounded w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="capitalize">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category 7: Seitas e Religiões */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col gap-3">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-red-500" /> Q7. Religiões e Seitas Praticadas
                    </h3>
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scroll">
                      {religioesSeitas.map(item => (
                        <label key={item} className="flex items-center gap-2 text-[11px] text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-650 rounded w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="capitalize">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category 8: Atividades místicas */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col gap-3">
                    <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest border-b border-neutral-800 pb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-500" /> Q8. Atividades Místicas Atendidas
                    </h3>
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scroll">
                      {atividadesMisticas.map(item => (
                        <label key={item} className="flex items-center gap-2 text-[11px] text-neutral-300 hover:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleItem(item)}
                            className="accent-red-650 rounded w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="capitalize">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 5: Feelings Checklist (Q9 with +140 options and Search filter) */}
            {step === 5 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-sans font-black text-white uppercase flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-red-500" /> 5. Q9. Sentimentos & Atitudes Históricas
                    </h2>
                    <p className="text-xs text-neutral-500 font-sans mt-0.5">Mapeie todo sentimento crônico repetitivo que consome sua alma no cotidiano.</p>
                  </div>
                  <span className="text-[10px] font-mono bg-red-950 border border-red-900/40 text-red-500 px-2 py-1 rounded font-bold">
                    {checkedItems.filter(x => sentimentosAtitudes.includes(x)).length} selecionados
                  </span>
                </div>

                {/* Filter / Search Bar Widget */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-850">
                  <div className="sm:col-span-8 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Pesquisar sentimento (ex: medo, amargura, culpa...)"
                      value={feelingsSearch}
                      onChange={(e) => setFeelingsSearch(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded pl-9 pr-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="sm:col-span-4 flex items-center gap-1 text-[10px] font-mono font-bold">
                    <button
                      onClick={() => setFeelingsFilter('all')}
                      className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${feelingsFilter === 'all' ? 'bg-red-650 text-white' : 'bg-neutral-900 text-neutral-500'}`}
                    >
                      Todos ({sentimentosAtitudes.length})
                    </button>
                    <button
                      onClick={() => setFeelingsFilter('checked')}
                      className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${feelingsFilter === 'checked' ? 'bg-red-650 text-white' : 'bg-neutral-900 text-neutral-500'}`}
                    >
                      Selecionados
                    </button>
                  </div>
                </div>

                {/* Grid list container */}
                <div className="bg-neutral-950 p-4 border border-neutral-850 rounded-lg max-h-[290px] overflow-y-auto custom-scroll">
                  {filteredFeelings.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {filteredFeelings.map(item => {
                        const isChecked = checkedItems.includes(item);
                        return (
                          <label 
                            key={item} 
                            className={`flex items-center gap-2.5 p-2 rounded border transition-colors cursor-pointer select-none text-[11px] ${
                              isChecked 
                                ? 'bg-red-950/20 border-red-900/60 text-red-400 font-bold' 
                                : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-750 text-neutral-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItem(item)}
                              className="accent-red-650 rounded cursor-pointer w-3.5 h-3.5 shrink-0"
                            />
                            <span className="truncate">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-neutral-600 py-8 font-mono">Nenhum sentimento encontrado para os critérios de busca.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 6: Deliverance questions Q10-26 */}
            {step === 6 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-base font-sans font-black text-white uppercase flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-red-500" /> 6. Questionamento de Manifestações & Opressões (Q10 a Q26)
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Selecione Sim ou Não para os questionamentos específicos teológicos de opressão sensorial:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto custom-scroll pr-1">
                  
                  {/* Question Cards */}
                  {[
                    { key: 'q10', label: 'Q10. Sente desejos compulsivos de amaldiçoar os pais ou a Deus?' },
                    { key: 'q11', label: 'Q11. Tem sentimentos de repulsa à Bíblia ou à Igreja?' },
                    { key: 'q12', label: 'Q12. Tem pensamentos compulsivos de suicídio ou homicídio em sua mente?' },
                    { key: 'q13', label: 'Q13. Sentimentos de amargura, ódio ou ressentimento contra pessoas que nem sabe o motivo?' },
                    { key: 'q14', label: 'Q14. Desejos compulsivos de ser pressionado ou forçado a fazer coisas erradas que no fundo não quer?' },
                    { key: 'q15', label: 'Q15. Sente desejos incontroláveis de arrasar outras pessoas (mentiras, difamações, críticas)?' },
                  ].map(q => (
                    <div key={q.key} className="bg-neutral-950 p-3.5 rounded border border-neutral-800 flex items-center justify-between gap-3 text-justify">
                      <span className="text-[11px] text-neutral-300 leading-tight font-sans">{q.label}</span>
                      <div className="flex gap-1 shrink-0 font-mono text-[10px] font-bold">
                        <button
                          onClick={() => handleTextAnswerChange(q.key, 'Sim')}
                          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${textAnswers[q.key] === 'Sim' ? 'bg-red-650 text-white shadow-md' : 'bg-neutral-900 text-neutral-500'}`}
                        >
                          SIM
                        </button>
                        <button
                          onClick={() => handleTextAnswerChange(q.key, 'Não')}
                          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${textAnswers[q.key] === 'Não' ? 'bg-neutral-900 border border-neutral-850 text-neutral-300' : 'bg-neutral-900 text-neutral-500'}`}
                        >
                          NÃO
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* SPECIAL SYMPTOM QUESTION 16 */}
                  <div className="bg-neutral-950 p-4 rounded border border-neutral-800 md:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-2 mb-3">
                      <span className="text-[11px] text-neutral-300 font-sans">
                        Q16. Tem sintomas físicos que aparecem subitamente e desaparecem sem nenhuma razão médica concreta?
                      </span>
                      <div className="flex gap-1 shrink-0 font-mono text-[10px] font-bold">
                        <button
                          onClick={() => handleTextAnswerChange('q16', 'Sim')}
                          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${textAnswers['q16'] === 'Sim' ? 'bg-red-650 text-white' : 'bg-neutral-900 text-neutral-500'}`}
                        >
                          SIM
                        </button>
                        <button
                          onClick={() => handleTextAnswerChange('q16', 'Não')}
                          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${textAnswers['q16'] === 'Não' ? 'bg-neutral-900 border border-neutral-850 text-neutral-300' : 'bg-neutral-900 text-neutral-500'}`}
                        >
                          NÃO
                        </button>
                      </div>
                    </div>
                    {textAnswers['q16'] === 'Sim' && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2 animate-fade-in pl-1">
                        {subSintomasFisicos.map(sym => (
                          <label key={sym} className="flex items-center gap-2 cursor-pointer select-none text-[10px] text-neutral-400 hover:text-white">
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(sym)}
                              onChange={() => toggleItem(sym)}
                              className="accent-red-650 rounded w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className="capitalize">{sym}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Remaining questions */}
                  {[
                    { key: 'q17', label: 'Q17. Sente profundas depressões recorrentes ou falta de vontade crônica de viver?' },
                    { key: 'q18', label: 'Q18. Tem acessos repentinos de pânico, terror noturno ou fobias inexplicáveis?' },
                    { key: 'q19', label: 'Q19. Tem sonhos apocalípticos ou pesadelos horrorosos e repetitivos?' },
                    { key: 'q20', label: 'Q20. Tem episódios súbitos de hostilidade, fúria incontida ou ira indócil?' },
                    { key: 'q21', label: 'Q21. Tem dúvidas recorrentes da sua salvação eterna, mesmo confessando a Jesus?' },
                    { key: 'q22', label: 'Q22. Sente forte sentimentos de culpa crônica e indignidade pesada?' },
                    { key: 'q23', label: 'Q23. É consumido por abrasamentos sexuais incontroláveis e impulsivos?' },
                    { key: 'q24', label: 'Q24. Tem a sensação nítida de vultos, espectros ou pessoas por perto quando sozinho?' },
                    { key: 'q25', label: 'Q25. Já sofreu alucinações visuais ou auditivas no quarto?' },
                    { key: 'q26', label: 'Q26. Tem medo irracional do escuro, isolamento ou silêncio absoluto?' }
                  ].map(q => (
                    <div key={q.key} className="bg-neutral-950 p-3.5 rounded border border-neutral-800 flex items-center justify-between gap-3 text-justify">
                      <span className="text-[11px] text-neutral-300 leading-tight font-sans">{q.label}</span>
                      <div className="flex gap-1 shrink-0 font-mono text-[10px] font-bold">
                        <button
                          onClick={() => handleTextAnswerChange(q.key, 'Sim')}
                          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${textAnswers[q.key] === 'Sim' ? 'bg-red-650 text-white' : 'bg-neutral-900 text-neutral-500'}`}
                        >
                          SIM
                        </button>
                        <button
                          onClick={() => handleTextAnswerChange(q.key, 'Não')}
                          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${textAnswers[q.key] === 'Não' ? 'bg-neutral-900 border border-neutral-850 text-neutral-300' : 'bg-neutral-900 text-neutral-500'}`}
                        >
                          NÃO
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              </motion.div>
            )}

          </div>

          {/* Bottom command buttons */}
          <div className="flex items-center justify-between border-t border-neutral-800 pt-5 mt-4">
            <div>
              {step > 1 && (
                <button
                  onClick={() => {
                    setStep(prev => prev - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 px-3.5 py-2 rounded transition-all select-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              )}
            </div>

            <div>
              {step < 6 ? (
                <button
                  onClick={() => {
                    setStep(prev => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={step === 1 && !nome}
                  className="flex items-center gap-1 text-xs font-mono bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer uppercase font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1 text-xs font-mono bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded transition-all active:scale-95 select-none cursor-pointer uppercase font-extrabold shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} /> Finalizar Diagnóstico
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
