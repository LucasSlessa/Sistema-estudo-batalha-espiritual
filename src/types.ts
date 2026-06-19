/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LessonSegment {
  title: string;
  subtitle?: string;
  verses?: Array<{ reference: string; text: string }>;
  content: string[]; // List of paragraphs
  bulletPoints?: string[];
  tips?: string[];
}

export interface Chapter {
  id: number;
  number: number;
  title: string;
  slug: string;
  summary: string;
  thumbnail: string; // Image path or placeholder seed
  quote?: { text: string; reference: string };
  lessons: LessonSegment[];
}

export type QuestionType = 'choice' | 'text';

export interface Question {
  id: number;
  questionText: string;
  type: QuestionType;
  options?: string[]; // For choice type
  correctAnswer?: string; // For choice type
  idealAnswer?: string; // For text type self-reflection
}

export interface ExerciseGroup {
  id: number;
  title: string;
  range: string; // e.g., "Capítulos 1 - 3"
  questions: Question[];
}

export interface QuestionnaireCategory {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
}

export interface UserProgress {
  theme: 'dark'; // Kept dark as requested for Netflix aesthetic
  completedLessons: string[]; // chapterId_lessonIndex
  bookmarkedChapters: number[];
  quizAnswers: Record<string, { answer: string; isCorrectStory?: boolean }>; // key is quizId_questionId
  lessonProgress?: Record<string, number>; // chapterId_lessonIndex -> scroll/playback percentage (0-100)
  questionnaireResponse?: {
    personalData: {
      nome: string;
      sexo: string;
      idade: string;
      endereco?: string;
      bairro?: string;
      cidade?: string;
      fone?: string;
      estadoCivil: string;
      numFilhos?: string;
      profissao: string;
      escolaridade?: string;
      religiaoAnterior?: string;
      tempoConvertido?: string;
      tempoBatismo?: string;
      jaUsouDrogas?: string;
      tinhaVicios?: string;
      quaisVicios?: string;
      tomaMedicamentos?: string;
      paraQueMedicamentos?: string;
      saudeHoje?: string;
      desequilibriosEmocionais?: string;
      fezTerapia?: string;
    };
    checkedItems: string[]; // list of item strings selected across categories
    textAnswers: Record<string, string>; // Flexible record to store all textual answers (Q1 to Q26 + custom questions)
  };
}
