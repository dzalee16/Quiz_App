import React, { useState, useEffect } from "react";
import QuestionsCard from "./components/QuestionsCard";
import { handleFetchQuestions, Difficulty, QuestionExtend } from "./API/index";
import { GlobalStyle } from "./styled";
import { formatTime } from "./utilities/utils";

//global variable
const TOTAL_QUESTIONS = 10;

enum Time {
  EASY = 300,
  MEDIUM = 480,
  HARD = 600,
}

export type Answer = {
  question: string;
  correct: boolean;
  correctAnswer: string;
  answer: string;
  score: number;
  time: number;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionExtend[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);
  const [chooseDifficulty, setChooseDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );
  const [time, setTime] = useState<Time>(Time.EASY);
  const [timerId, setTimerId] = useState<any>(null);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  useEffect(() => {
    console.log(userAnswer);
  }, [userAnswer]);

  useEffect(() => {
    console.log(time);
  }, [time]);

  // Handle start game
  const handleStartGame = async () => {
    try {
      setIsLoading(true);
      setIsGameOver(false);
      const newQuestions = await handleFetchQuestions(
        TOTAL_QUESTIONS,
        chooseDifficulty
      );
      setQuestions(newQuestions);
      setTimer();
    } catch (err) {
      console.log("Error has occured while fetching data", err);
    }
    setScore(0);
    setQuestionNumber(0);
    setUserAnswer([]);
    setIsLoading(false);
  };

  //Checking if answer is correct
  const handleCheckAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[questionNumber].correct_answer === answer;
      if (correct) {
        setScore((prevState) => prevState + 1);
      }
      const newAnswer = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
        score,
        time,
      };
      setUserAnswer((prevState) => [...prevState, newAnswer]);
    }
  };

  //Handle next question
  const handleNextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setIsGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  const handleChooseDifficulty = (e: React.MouseEvent<HTMLSelectElement>) => {
    switch (true) {
      case e.currentTarget.value.toLocaleLowerCase() === "easy":
        setChooseDifficulty(Difficulty.EASY);
        setTime(Time.EASY);
        break;
      case e.currentTarget.value.toLocaleLowerCase() === "medium":
        setChooseDifficulty(Difficulty.MEDIUM);
        setTime(Time.MEDIUM);
        break;
      case e.currentTarget.value.toLocaleLowerCase() === "hard":
        setChooseDifficulty(Difficulty.HARD);
        setTime(Time.HARD);
        break;
    }
  };

  const setTimer = () => {
    const newTimerId: any = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    if (time <= 0 || userAnswer.length === 10) {
      clearInterval(timerId);
    }
  }, [time, userAnswer]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <main className="app">
        <div className="container">
          <h1>Quiz App</h1>
          <p>Try to answer correctly to more questions that you can! :D</p>
          <div className="quiz-content">
            {isGameOver ? (
              <button className="start-btn" onClick={handleStartGame}>
                Start Quiz
              </button>
            ) : null}

            {isGameOver && !isLoading ? (
              <div className="difficulty">
                <select onClick={handleChooseDifficulty}>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            ) : (
              !isLoading && (
                <>
                  <div className="show-difficulty">
                    Difficulty: {chooseDifficulty.toUpperCase()}
                  </div>
                  <div className="timer">Time: {formatTime(time)}</div>
                </>
              )
            )}

            {isLoading && (
              <div className="loader">
                <div className="react1"></div>
                <div className="react2"></div>
                <div className="react3"></div>
                <div className="react4"></div>
                <div className="react5"></div>
              </div>
            )}

            {!isLoading && !isGameOver ? (
              <p className="score">Score: {score}</p>
            ) : null}

            {!isLoading && !isGameOver && (
              <QuestionsCard
                question={questions[questionNumber].question}
                answers={questions[questionNumber].answers}
                callback={handleCheckAnswer}
                userAnswer={userAnswer ? userAnswer[questionNumber] : undefined}
                questionNumber={questionNumber + 1}
                totalQuestions={TOTAL_QUESTIONS}
              />
            )}
            {!isGameOver &&
            !isLoading &&
            userAnswer.length === questionNumber + 1 &&
            questionNumber !== TOTAL_QUESTIONS ? (
              <button className="next-btn" onClick={handleNextQuestion}>
                Next Question
              </button>
            ) : null}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;

// (
//   userAnswer.length === TOTAL_QUESTIONS ? (
//     <button>Look table</button>
//   ) :
