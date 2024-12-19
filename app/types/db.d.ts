// app/types/db.d.ts

export interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    quizzes: Quiz[];
    attempts: QuizAttempt[];
}

export interface Quiz {
    id: number;
    userId: number;
    prompt: string;
    title: string;
    createdAt: Date;
    user: User;
    questions: Question[];
    attempts: QuizAttempt[];
}

export type QuestionType = 'mcq' | 'open-ended';

export interface Question {
    id: number;
    quizId: number;
    questionText: string;
    questionType: QuestionType;
    correctOption: number | null;
    explanation: string | null;
    createdAt: Date;
    quiz: Quiz;
    options: Option[];
    answers: UserAnswer[];
}

export interface Option {
    id: number;
    questionId: number;
    optionText: string;
    optionIndex: number;
    question: Question;
}

export interface QuizAttempt {
    id: number;
    quizId: number;
    userId: number;
    score: number | null;
    passed: boolean;
    attemptDate: Date;
    quiz: Quiz;
    user: User;
    answers: UserAnswer[];
}

export interface UserAnswer {
    id: number;
    attemptId: number;
    questionId: number;
    userResponse: string;
    isCorrect: boolean;
    attempt: QuizAttempt;
    question: Question;
}
