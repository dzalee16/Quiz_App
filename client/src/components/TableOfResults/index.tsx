import React from "react";
import { Difficulty } from "../../API/index";
import { formatTime } from "../../utilities/utils";

import { Table, TableHead, TableData } from "./styled";

export type User = {
  username: string;
  score: number;
  time: number;
  difficulty: Difficulty;
};

const TableOfResults: any = ({ users }: { users: [User] }) => {
  return (
    <Table className="table">
      <thead>
        <tr>
          <TableHead>Num</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Time</TableHead>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <TableData>{index + 1}.</TableData>
            <TableData>{user.username}</TableData>
            <TableData>{user.score}</TableData>
            <TableData>{formatTime(user.time)}</TableData>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableOfResults;
