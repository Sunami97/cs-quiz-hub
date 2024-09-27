export type quizTopic = {
    id: string;
    name: string;
    description: string;
}

export interface Quiz {
    quiz: {
        question: string[];
        options: string[];
        answer: string;
    }[];
}