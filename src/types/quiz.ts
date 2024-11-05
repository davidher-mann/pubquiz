export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple' | 'text';
  options?: string[];
  correctAnswer: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    aspect: '16:9' | '1:1';
  };
}

export interface QuizState {
  currentQuestionIndex: number;
  showResults: boolean;
  timerRunning: boolean;
  timeRemaining: number;
}