import axios from "axios";
import { Difficulty } from "../API/index";
import { User } from "../components/TableOfResults";

const server = process.env.REACT_APP_SERVER;

//get easy table
export const getEasy = async () => {
  const arr: User[] = [];
  try {
    const data = await (await axios.get(`${server}/users`)).data;
    data.forEach((elem: User, index: number) => {
      if (elem.difficulty === "easy") {
        arr.push(elem);
        arr.sort((a, b) => b.time - a.time);
      }
    });
    arr.sort((a, b) => b.score - a.score);
    return arr.slice(0, 5);
  } catch (err) {
    console.log("Error has occured", err);
  }
};

//get medium table
export const getMedium = async () => {
  const arr: User[] = [];
  try {
    const data = await (await axios.get(`${server}/users`)).data;
    data.forEach((elem: User) => {
      if (elem.difficulty === "medium") {
        arr.push(elem);
        arr.sort((a, b) => b.time - a.time);
      }
    });
    arr.sort((a, b) => b.score - a.score);
    return arr.slice(0, 5);
  } catch (err) {
    console.log("Error has occured", err);
  }
};

//get hard table
export const getHard = async () => {
  const arr: User[] = [];
  try {
    const data = await (await axios.get(`${server}/users`)).data;
    data.forEach((elem: User) => {
      if (elem.difficulty === "hard") {
        arr.push(elem);
        arr.sort((a, b) => b.time - a.time);
      }
    });
    arr.sort((a, b) => b.score - a.score);
    return arr.slice(0, 5);
  } catch (err) {
    console.log("Error has occured", err);
  }
};

//create users
type data = {
  username: string;
  score: number;
  time: number;
  difficulty: Difficulty;
};

export const createUser = (data: data) => {
  return axios.post(`${server}/users`, data);
};
