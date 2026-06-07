/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudentInfo {
  nama: string;
  kelas: string;
}

export type QuestionType = 
  | 'pilihan-ganda' 
  | 'pilihan-ganda-kompleks' 
  | 'benar-salah' 
  | 'menjodohkan';

export type DifficultyLevel = 'mudah' | 'sedang' | 'sulit';

export interface TrueFalseStatement {
  id: string;
  statement: string;
  correctAnswer: 'benar' | 'salah';
}

export interface MatchingPair {
  id: string;
  premise: string; // The item on the left
  correctMatch: string; // The item on the right
}

export interface QuestionData {
  id: number;
  type: QuestionType;
  difficulty: DifficultyLevel;
  stimulus: string; // Background information, context, or visual tables in text/markdown form
  questionText: string;
  options?: string[]; // Used for pilihan-ganda and pilihan-ganda-kompleks
  correctOption?: number; // Index for pilihan-ganda
  correctOptions?: number[]; // Indices for pilihan-ganda-kompleks
  tfStatements?: TrueFalseStatement[]; // Used for benar-salah
  matchingPairs?: MatchingPair[]; // Used for menjodohkan
  matchingOptions?: string[]; // Distractors/targets for the right side of matching
}

export interface QuizResponse {
  questionId: number;
  isAnswered: boolean;
  isFlagged: boolean; // Ragu-ragu
  selectedOption?: number; // for pilihan-ganda
  selectedOptions?: number[]; // for pilihan-ganda-kompleks
  tfAnswers?: Record<string, 'benar' | 'salah'>; // for benar-salah: statementId -> user selection
  matchingAnswers?: Record<string, string>; // for menjodohkan: premiseId -> selected target
}

export interface QuizSummary {
  tanggalWaktu: string;
  nama: string;
  kelas: string;
  benar: number;
  salah: number;
  terjawab: number;
  raguRagu: number;
  belumTerjawab: number;
  nilai: number;
}
