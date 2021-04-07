import React, { useEffect } from "react";
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
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Table className="table">
      <thead>
        <tr>
          <TableHead>Username</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Time</TableHead>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
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
