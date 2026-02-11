import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson, Question, QuestionState, LessonProgress } from '../models/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private lessons: Lesson[] = [];
  private currentLessonId: number | null = null;
  private currentQuestionIndex: number = 0;
  private lessonProgressMap: Map<number, LessonProgress> = new Map();

  private currentLessonSubject = new BehaviorSubject<Lesson | null>(null);
  public currentLesson$ = this.currentLessonSubject.asObservable();

  private currentQuestionSubject = new BehaviorSubject<Question | null>(null);
  public currentQuestion$ = this.currentQuestionSubject.asObservable();

  private currentQuestionIndexSubject = new BehaviorSubject<number>(0);
  public currentQuestionIndex$ = this.currentQuestionIndexSubject.asObservable();

  constructor() {
    this.initializeLessons();
  }

  private initializeLessons(): void {
    // Initialize 25 lessons with sample questions
    for (let lessonId = 1; lessonId <= 25; lessonId++) {
      const questions: Question[] = [];
      
      for (let qNum = 1; qNum <= 20; qNum++) {
        questions.push({
          id: `lesson-${lessonId}-q-${qNum}`,
          lessonId: lessonId,
          questionNumber: qNum,
          text: `Lesson ${lessonId} - Question ${qNum}: What is the correct answer for this question?`,
          answers: [
            { id: `a-${lessonId}-${qNum}-1`, text: `Option A for Question ${qNum}`, isCorrect: qNum % 4 === 1 },
            { id: `a-${lessonId}-${qNum}-2`, text: `Option B for Question ${qNum}`, isCorrect: qNum % 4 === 2 },
            { id: `a-${lessonId}-${qNum}-3`, text: `Option C for Question ${qNum}`, isCorrect: qNum % 4 === 3 },
            { id: `a-${lessonId}-${qNum}-4`, text: `Option D for Question ${qNum}`, isCorrect: qNum % 4 === 0 }
          ]
        });
      }

      this.lessons.push({
        id: lessonId,
        title: `Lesson ${lessonId}`,
        questions: questions
      });

      // Initialize progress for this lesson
      const progress: LessonProgress = {
        lessonId: lessonId,
        questionStates: new Map()
      };
      this.lessonProgressMap.set(lessonId, progress);
    }
  }

  getAllLessons(): Lesson[] {
    return this.lessons;
  }

  getLesson(lessonId: number): Lesson | undefined {
    return this.lessons.find(l => l.id === lessonId);
  }

  loadLesson(lessonId: number): void {
    const lesson = this.getLesson(lessonId);
    if (lesson) {
      this.currentLessonId = lessonId;
      this.currentLessonSubject.next(lesson);
      this.currentQuestionIndex = 0;
      this.loadQuestion(0);
    }
  }

  loadQuestion(index: number): void {
    const lesson = this.currentLessonSubject.value;
    if (lesson && index >= 0 && index < lesson.questions.length) {
      this.currentQuestionIndex = index;
      this.currentQuestionIndexSubject.next(index);
      this.currentQuestionSubject.next(lesson.questions[index]);
    }
  }

  getCurrentQuestion(): Question | null {
    return this.currentQuestionSubject.value;
  }

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getQuestionState(questionId: string): QuestionState | undefined {
    if (!this.currentLessonId) return undefined;
    const progress = this.lessonProgressMap.get(this.currentLessonId);
    return progress?.questionStates.get(questionId);
  }

  answerQuestion(questionId: string, answerId: string): { isCorrect: boolean; shouldShowNext: boolean } {
    const question = this.getCurrentQuestion();
    if (!question || question.id !== questionId) {
      return { isCorrect: false, shouldShowNext: false };
    }

    const selectedAnswer = question.answers.find(a => a.id === answerId);
    if (!selectedAnswer) {
      return { isCorrect: false, shouldShowNext: false };
    }

    const isCorrect = selectedAnswer.isCorrect;
    const progress = this.lessonProgressMap.get(this.currentLessonId!);
    
    if (progress) {
      const existingState = progress.questionStates.get(questionId);
      const newState: QuestionState = {
        questionId: questionId,
        isAnswered: true,
        isCorrect: isCorrect,
        selectedAnswerId: answerId,
        attempts: (existingState?.attempts || 0) + 1
      };
      progress.questionStates.set(questionId, newState);
    }

    return { isCorrect: isCorrect, shouldShowNext: isCorrect };
  }

  shuffleAnswers(question: Question): Question {
    const shuffled = [...question.answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { ...question, answers: shuffled };
  }

  canGoNext(): boolean {
    const lesson = this.currentLessonSubject.value;
    return lesson ? this.currentQuestionIndex < lesson.questions.length - 1 : false;
  }

  canGoPrevious(): boolean {
    return this.currentQuestionIndex > 0;
  }

  goToNextQuestion(): void {
    if (this.canGoNext()) {
      this.loadQuestion(this.currentQuestionIndex + 1);
    }
  }

  goToPreviousQuestion(): void {
    if (this.canGoPrevious()) {
      this.loadQuestion(this.currentQuestionIndex - 1);
    }
  }

  goToQuestionByNumber(questionNumber: number): void {
    const lesson = this.currentLessonSubject.value;
    if (lesson && questionNumber >= 1 && questionNumber <= lesson.questions.length) {
      this.loadQuestion(questionNumber - 1);
    }
  }

  isQuestionCorrect(questionId: string): boolean {
    const state = this.getQuestionState(questionId);
    return state?.isCorrect ?? false;
  }

  isQuestionAnswered(questionId: string): boolean {
    const state = this.getQuestionState(questionId);
    return state?.isAnswered ?? false;
  }
}
