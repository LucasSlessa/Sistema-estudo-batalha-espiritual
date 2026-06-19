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
      estadoCivil: string;
      profissao: string;
    };
    checkedItems: string[]; // list of item strings selected across categories
    textAnswers: {
      relacionamentoFamiliar: string;
      motivosQuebra: string;
      relacionamentoPais: string;
      traumasPassado: string;
      compulsoesAmaldicoar: string;
      repulsaBiblia: string;
      pensamentosSuicidio: string;
    };
  };
}
