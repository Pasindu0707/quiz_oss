import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service2';
import { Question, QuestionState } from '../../models/question.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: false
})
export class QuizComponent implements OnInit, OnDestroy {
  currentQuestion: Question | null = null;
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;
  lessonId: number | null = null;
  showPartyPops: boolean = false;
  showRetry: boolean = false;
  isAnswered: boolean = false;
  selectedAnswerId: string | null = null;
  shuffledQuestion: Question | null = null;
  allQuestions: Question[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const lessonId = +params['lessonId'];
      if (lessonId) {
        this.lessonId = lessonId;
        this.quizService.loadLesson(lessonId);
      }
    });

    this.subscriptions.push(
      this.quizService.currentQuestion$.subscribe(question => {
        this.currentQuestion = question;
        if (question) {
          this.resetQuestionState();
          this.loadQuestionState();
        }
      })
    );

    this.subscriptions.push(
      this.quizService.currentLesson$.subscribe(lesson => {
        if (lesson) {
          this.totalQuestions = lesson.questions.length;
          this.allQuestions = lesson.questions;
        }
      })
    );

    this.subscriptions.push(
      this.quizService.currentQuestionIndex$.subscribe(index => {
        this.currentQuestionIndex = index;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private resetQuestionState(): void {
    this.showPartyPops = false;
    this.showRetry = false;
    this.isAnswered = false;
    this.selectedAnswerId = null;
    this.shuffledQuestion = null;
  }

  private loadQuestionState(): void {
    if (!this.currentQuestion) return;

    const state = this.quizService.getQuestionState(this.currentQuestion.id);
    if (state && state.isAnswered) {
      this.isAnswered = true;
      this.selectedAnswerId = state.selectedAnswerId || null;
      if (state.isCorrect) {
        this.showPartyPops = true;
        // Shuffle answers for correct answer display
        this.shuffledQuestion = this.quizService.shuffleAnswers(this.currentQuestion);
      } else {
        this.showRetry = true;
        // Don't shuffle yet - keep original order to show wrong answer in red
        // Shuffling will happen when retry is clicked
        this.shuffledQuestion = this.currentQuestion;
      }
    } else {
      // Fresh question - shuffle answers
      this.shuffledQuestion = this.quizService.shuffleAnswers(this.currentQuestion);
    }
  }

  getDisplayQuestion(): Question | null {
    return this.shuffledQuestion || this.currentQuestion;
  }

  selectAnswer(answerId: string): void {
    if (this.isAnswered || !this.currentQuestion) return;

    this.selectedAnswerId = answerId;
    const result = this.quizService.answerQuestion(this.currentQuestion.id, answerId);

    if (result.isCorrect) {
      this.showPartyPops = true;
      this.isAnswered = true;
      // Shuffle answers for correct answer display
      this.shuffledQuestion = this.quizService.shuffleAnswers(this.currentQuestion);
    } else {
      this.showRetry = true;
      this.isAnswered = true;
      // Don't shuffle yet - keep current order to show wrong answer in red
      // Shuffling will happen when retry button is clicked
      this.shuffledQuestion = this.currentQuestion;
    }
  }

  retryQuestion(): void {
    if (!this.currentQuestion) return;
    
    // Reset state
    this.isAnswered = false;
    this.selectedAnswerId = null;
    this.showRetry = false;
    this.showPartyPops = false;
    
    // Shuffle answers when retry is clicked
    this.shuffledQuestion = this.quizService.shuffleAnswers(this.currentQuestion);
  }

  nextQuestion(): void {
    if (this.quizService.canGoNext()) {
      this.quizService.goToNextQuestion();
    }
  }

  previousQuestion(): void {
    if (this.quizService.canGoPrevious()) {
      this.quizService.goToPreviousQuestion();
    }
  }

  goToQuestion(questionNumber: number): void {
    this.quizService.goToQuestionByNumber(questionNumber);
  }

  goBackToLessons(): void {
    this.router.navigate(['/']);
  }

  isQuestionCorrect(questionId: string): boolean {
    return this.quizService.isQuestionCorrect(questionId);
  }

  isAnswerSelected(answerId: string): boolean {
    return this.selectedAnswerId === answerId;
  }

  isAnswerCorrect(answerId: string): boolean {
    if (!this.currentQuestion || !this.isAnswered) return false;
    const answer = this.currentQuestion.answers.find(a => a.id === answerId);
    return answer?.isCorrect ?? false;
  }

  canGoNext(): boolean {
    return this.quizService.canGoNext();
  }

  canGoPrevious(): boolean {
    return this.quizService.canGoPrevious();
  }

  isQuestionNumberCorrect(questionNumber: number): boolean {
    if (questionNumber < 1 || questionNumber > this.allQuestions.length) {
      return false;
    }
    const question = this.allQuestions[questionNumber - 1];
    return this.isQuestionCorrect(question.id);
  }
}
