import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  justify-content: center;

  h3,
  h4 {
    padding: 10px 5px;
    font-size: 1.8rem;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.2),
      3px 3px 3px rgba(0, 0, 0, 0.2), 4px 4px 4px rgba(0, 0, 0, 0.2),
      5px 5px 5px rgba(0, 0, 0, 0.2), 6px 6px 6px rgba(0, 0, 0, 0.2),
      7px 7px 7px rgba(0, 0, 0, 0.2), 8px 8px 8px rgba(0, 0, 0, 0.2),
      9px 9px 9px rgba(0, 0, 0, 0.2), 10px 10px 10px rgba(0, 0, 0, 0.4);
  }

  @media only screen and (max-width: 580px) {
    width: 100%;
    align-items: center;

    h3,
    h4 {
      font-size: 1.3rem;
      text-align: center;
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 40px;

  @media only screen and (max-width: 430px) {
    margin: 0;
  }
`;

export const ButtonWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  padding: 10px 5px;

  @media only screen and (max-width: 430px) {
    width: 300px;
    padding: 0;
  }
`;

type ButtonProps = {
  correct: boolean;
  userClicked: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 10px;
  margin: 5px 0;
  font-size: 1.4rem;
  font-weight: 900;
  background: ${({ correct, userClicked }) =>
    correct ? "green" : !correct && userClicked ? "red" : "#4fb0bd"};
  border: none;
  color: #18183d;
  border-radius: 30px;
  cursor: pointer;
  outline: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.2),
    3px 3px 3px rgba(0, 0, 0, 0.2), 4px 4px 4px rgba(0, 0, 0, 0.2),
    5px 5px 5px rgba(0, 0, 0, 0.2), 6px 6px 6px rgba(0, 0, 0, 0.2),
    7px 7px 7px rgba(0, 0, 0, 0.2), 8px 8px 8px rgba(0, 0, 0, 0.2),
    9px 9px 9px rgba(0, 0, 0, 0.2), 10px 10px 10px rgba(0, 0, 0, 0.4);
`;
