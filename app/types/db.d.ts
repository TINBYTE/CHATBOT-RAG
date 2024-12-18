// app/types/db.d.ts

export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    created_at: Date;
}

export interface Quiz {
    id: number;
    user_id: number;
    prompt: string;
    title: string;
    created_at: Date;
}

export type QuestionType = 'mcq' | 'open-ended';

export interface Question {
    id: number;
    quiz_id: number;
    question_text: string;
    question_type: QuestionType;
    correct_option: number | null;
    explanation: string | null;
    created_at: Date;
}

 export interface Option {
   id: number;
   question_id: number;
   option_text: string;
   option_index: number;
 }

export interface QuizAttempt {
    id: number;
    quiz_id: number;
    user_id: number;
    score: number;
    passed: boolean;
    attempt_date: Date;
}

export interface UserAnswer {
    id: number;
    attempt_id: number;
    question_id: number;
    user_response: string;
    is_correct: boolean;
}