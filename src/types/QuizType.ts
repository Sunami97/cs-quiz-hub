export type QuizTopic =
    'HTML / CSS'
    | '자바스크립트'
    | '프레임워크 및 라이브러리'
    | '리액트, SSR과 CSR'
    | '네트워크'
    | '운영체제'
    | '알고리즘 및 자료구조'
    | '소프트웨어 아키텍처'
    | '클라우드와 배포';

export type Difficulty = "상" | "중" | "하";
export type QuestionCount = "5" | "10" | "15";
export type QuestionType = "객관식" | "빈칸 채우기" | "참 또는 거짓";

export interface QuizOption {
    topic: QuizTopic;
    difficulty: Difficulty;
    questionCount: QuestionCount;
    questionType: QuestionType;
}

export interface MultipleChoice {
    question: string;
    options: string[];
    answer: string;
    commentary: string;
}

export interface TrueOrFalse {
    question: string;
    answer: boolean;
    commentary: string;
}

export interface FillBlank {
    question: string;
    answer: string[];
    commentary: string;
}

export interface Quiz {
    Type: QuestionType;
    Item: MultipleChoice[] | TrueOrFalse[] | FillBlank[];
}