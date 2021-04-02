import React, { useState, useEffect } from "react";
import QuestionsCard from "./components/QuestionsCard";
import TableOfResults from "./components/TableOfResults/index.";
import { handleFetchQuestions, Difficulty, QuestionExtend } from "./API/index";
import { GlobalStyle } from "./styled";
import { formatTime } from "./utilities/utils";
import { getUsers, createUser } from "./services/db";

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
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    console.log(questionNumber);
  }, [questionNumber]);

  useEffect(() => {
    console.log(userAnswer.length);
  }, [userAnswer.length]);

  // useEffect(() => {
  //   console.log(time);
  // }, [time]);

  // useEffect(() => {
  //   console.log(username);
  // }, [username]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   const data = {
  //     username: "Jovic",
  //     score: 3,
  //     time: 2,
  //     difficulty: Difficulty.EASY,
  //   };
  //   createUser(data)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // Handle start game
  const handleStartGame = async () => {
    if (username !== "" && username !== null) {
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
    } else {
      setErrMsg("You must enter your name");
    }
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

  const handleUsername = (e: React.FocusEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleEndGame = () => {
    const data = {
      username,
      score,
      time,
      difficulty: chooseDifficulty,
    };
    createUser(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsGameOver(true);
  };

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
              <>
                <div className="difficulty">
                  <select onClick={handleChooseDifficulty}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div className="username">
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    onChange={handleUsername}
                  />
                </div>
                <p className="errMsg">{errMsg}</p>
                <TableOfResults />
              </>
            ) : (
              !isLoading && (
                <>
                  <div className="showUsername">Username: {username}</div>
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
            userAnswer.length !== TOTAL_QUESTIONS ? (
              <button className="next-btn" onClick={handleNextQuestion}>
                Next Question
              </button>
            ) : !isGameOver &&
              !isLoading &&
              userAnswer.length === TOTAL_QUESTIONS ? (
              <button onClick={handleEndGame}>End Game</button>
            ) : null}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
