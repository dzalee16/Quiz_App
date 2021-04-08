import styled from "styled-components";

export const Table = styled.table`
  margin-top: 10px;
  width: 400px;
  heigth: 600px;
  border: 1px solid gold;
  color: white;
  background: #18183d;

  @media only screen and (max-width: 420px) {
    width: 310px;
  }
`;

export const TableHead = styled.th`
  border: 1px solid red;
  padding: 2px;
`;

export const TableData = styled.td`
  border: 1px solid #067ba2;
  text-align: center;
  padding: 5px;
`;
