import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service2';
import { Lesson } from '../../models/question.interface';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'],
  standalone: false
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lessons = this.quizService.getAllLessons();
  }

  selectLesson(lessonId: number): void {
    this.quizService.loadLesson(lessonId);
    this.router.navigate(['/quiz', lessonId]);
  }

  hasCorrectAnswers(lesson: Lesson): boolean {
    return lesson.questions.some(q => 
      this.quizService.isQuestionCorrect(q.id)
    );
  }

  isQuestionCorrect(questionId: string): boolean {
    return this.quizService.isQuestionCorrect(questionId);
  }
}
