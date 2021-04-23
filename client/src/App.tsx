import React, { useState, useEffect } from "react";
import QuestionsCard from "./components/QuestionsCard";
import TableOfResults from "./components/TableOfResults/index";
import { handleFetchQuestions, Difficulty, QuestionExtend } from "./API/index";
import { GlobalStyle, Button } from "./styled";
import { formatTime } from "./utilities/utils";
import { createUser, getEasy, getMedium, getHard } from "./services/db";
import { User } from "./components/TableOfResults/index";

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
  const [username, setUsername] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isActive, setIsActive] = useState<Difficulty>(Difficulty.EASY);

  //Default table
  useEffect(() => {
    switch (true) {
      case isActive === "easy":
        getEasy()
          .then((res: User[] = []) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
        break;
      case isActive === "medium":
        getMedium()
          .then((res: User[] = []) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
        break;
      case isActive === "hard":
        getHard()
          .then((res: User[] = []) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
        break;
    }
  }, [isActive]);

  // Handle start game
  const handleStartGame = async () => {
    if (username !== "" && username !== null && !/\s/g.test(username)) {
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
      setErrMsg("Enter your name whitout whitespaces!!!");
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
    let newTimerId: any = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    if (time <= 0 || userAnswer.length === 10) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [time, userAnswer]);

  const handleUsername = (e: React.FocusEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
    setErrMsg("");
  };

  const handleEndGame = () => {
    const data = {
      username,
      score,
      time,
      difficulty: chooseDifficulty,
    };
    createUser(data)
      .then((res) => {
        const data = res.data;
        if (data.difficulty === "easy") {
          setTime(Time.EASY);
          return getEasy();
        } else if (data.difficulty === "medium") {
          setTime(Time.MEDIUM);
          return getMedium();
        } else if (data.difficulty === "hard") {
          setTime(Time.HARD);
          return getHard();
        }
      })
      .then((res: User[] = []) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));
    setIsGameOver(true);
    setIsActive(chooseDifficulty);
  };

  const handleShowTable = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (true) {
      case e.currentTarget.value === "easy":
        setIsActive(Difficulty.EASY);
        getEasy()
          .then((res: User[] = []) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
        break;
      case e.currentTarget.value === "medium":
        setIsActive(Difficulty.MEDIUM);
        getMedium()
          .then((res: User[] = []) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
        break;
      case e.currentTarget.value === "hard":
        setIsActive(Difficulty.HARD);
        getHard()
          .then((res: User[] = []) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
        break;
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <main className="app">
        <div className="container">
          <h1>Quiz App</h1>
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
                <div className="table-field">
                  <Button
                    userClicked={Difficulty.EASY === isActive}
                    value={Difficulty.EASY}
                    onClick={handleShowTable}
                  >
                    Easy
                  </Button>
                  <Button
                    userClicked={Difficulty.MEDIUM === isActive}
                    value={Difficulty.MEDIUM}
                    onClick={handleShowTable}
                  >
                    Medium
                  </Button>
                  <Button
                    userClicked={Difficulty.HARD === isActive}
                    value={Difficulty.HARD}
                    onClick={handleShowTable}
                  >
                    Hard
                  </Button>
                </div>
                <TableOfResults users={users} />
              </>
            ) : (
              !isLoading && (
                <div className="info">
                  <p className="showUsername">Username: {username}</p>
                  <p className="show-difficulty">
                    Difficulty: {chooseDifficulty.toUpperCase()}
                  </p>
                  <p className="timer">{formatTime(time)}</p>
                  <p className="score">Score: {score}</p>
                </div>
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
              <button className="endGame-btn" onClick={handleEndGame}>
                End Game
              </button>
            ) : null}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
