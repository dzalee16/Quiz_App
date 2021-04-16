import React from "react";
import {
  Wrapper,
  TableOfContent,
  ButtonWrapper,
  ButtonWrapperContent,
  Button,
} from "./styled";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionsCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Wrapper className="questions-card">
      <TableOfContent className="table-of-content">
        <h3>
          Question: {questionNumber} / {totalQuestions}
        </h3>
        <h4 dangerouslySetInnerHTML={{ __html: question }}></h4>
      </TableOfContent>
      <ButtonWrapper className="questions-card-listOfitems">
        {answers.map((answer: string) => (
          <ButtonWrapperContent key={answer} className="questions-card-items">
            <Button
              className="items-btn"
              disabled={userAnswer}
              value={answer}
              onClick={callback}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </Button>
          </ButtonWrapperContent>
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default QuestionsCard;
