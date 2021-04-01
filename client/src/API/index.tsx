import { handleShuffleArray } from "../utilities/utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//type of questions from API
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

//extend Questions with answers field to keep offered answers
export type QuestionExtend = Question & { answers: string[] };

//async function for fetch questions
export const handleFetchQuestions = async (
  amount: number,
  difficulty: string
) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  try {
    const data = await (await fetch(ENDPOINT)).json();
    return data.results.map((questions: Question) => {
      return {
        ...questions,
        answers: handleShuffleArray([
          ...questions.incorrect_answers,
          questions.correct_answer,
        ]),
      };
    });
  } catch (err) {
    console.log("Error has occured", err);
  }
};
