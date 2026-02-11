export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  lessonId: number;
  questionNumber: number;
  text: string;
  answers: Answer[];
}

export interface Lesson {
  id: number;
  title: string;
  questions: Question[];
}

export interface QuestionState {
  questionId: string;
  isAnswered: boolean;
  isCorrect: boolean;
  selectedAnswerId?: string;
  attempts: number;
}

export interface LessonProgress {
  lessonId: number;
  questionStates: Map<string, QuestionState>;
}
