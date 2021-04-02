import axios from "axios";
import { Difficulty } from "../API/index";

const server = "http://localhost:8080";

//get users
export const getUsers = async () => {
  return axios.get(`${server}/users`);
};

//create users
type data = {
  username: string;
  score: number;
  time: number;
  difficulty: Difficulty;
};

export const createUser = async (data: data) => {
  return axios.post(`${server}/users`, data);
};
