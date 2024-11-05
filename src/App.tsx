import React, { useState, useEffect, useCallback } from 'react';
import { Brain, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import quizData from './data/questions.json';
import { Question } from './components/Question';
import { Timer } from './components/Timer';
import { Results } from './components/Results';
import type { QuizState } from './types/quiz';

const QUESTION_TIME = 45; // seconds

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    showResults: false,
    timerRunning: true,
    timeRemaining: QUESTION_TIME,
  });

  const currentQuestion = quizData.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizData.questions.length - 1;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizState.timeRemaining > 0 && quizState.timerRunning && !quizState.showResults) {
      timer = setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState.timeRemaining, quizState.timerRunning, quizState.showResults]);

  const handleNext = useCallback(() => {
    if (quizState.currentQuestionIndex < quizData.questions.length - 1) {
      setQuizState({
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
        showResults: false,
        timerRunning: true,
        timeRemaining: QUESTION_TIME,
      });
    }
  }, [quizState.currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState({
        currentQuestionIndex: quizState.currentQuestionIndex - 1,
        showResults: false,
        timerRunning: true,
        timeRemaining: QUESTION_TIME,
      });
    }
  }, [quizState.currentQuestionIndex]);

  const handleTogglePause = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  }, []);

  const handleEndQuiz = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      showResults: true,
      timerRunning: false,
    }));
  }, []);

  const handleRestartQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      showResults: false,
      timerRunning: true,
      timeRemaining: QUESTION_TIME,
    });
  }, []);

  if (quizState.showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Quiz Results</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Results onRestart={handleRestartQuiz} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Quiz Presenter</h1>
            </div>
            <Timer 
              timeRemaining={quizState.timeRemaining} 
              isPaused={!quizState.timerRunning}
              onTogglePause={handleTogglePause}
            />
            <div className="text-sm text-gray-600">
              Question {quizState.currentQuestionIndex + 1} of {quizData.questions.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Question question={currentQuestion} />
        
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={quizState.currentQuestionIndex === 0}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleEndQuiz}
              className="flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              End Quiz
              <Flag className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;