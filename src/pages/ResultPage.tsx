import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../color';
import Button from '../components/Button';

type Result = {
  question: string;
  answer: string;
  userAnswer: string;
  commentary: string;
}[]

const checkCorrectAnswers = (reuslt: Result): boolean[] => {
  const comparison = reuslt.map((reuslt) => {
    if (reuslt.userAnswer === reuslt.answer) {
      return true;
    }

    return false;
  })

  return comparison;
}

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reuslt: Result = location.state;
  const comparison = checkCorrectAnswers(reuslt);

  console.log(reuslt);
  const goHome = () => {
    navigate('/');
  };

  return (
    <ResultWrapper>
      <ResultContent>
        <Title>퀴즈 결과</Title>
        <ResultText>{comparison.length}문제 중 {comparison.filter((comparison) => comparison).length}문제 맞히셨습니다.</ResultText>
        <CommentaryListWrapper>
          {reuslt.map((data, index: number) => {
            return <CommentaryItem key={index} $isCorrect={comparison[index]}>
              <CommentaryItemTextWrapper>
                <TextWrapper>
                  <IndexText>Q{index + 1}</IndexText>
                  <CommentaryText>{data.question}</CommentaryText>
                </TextWrapper>
                <TextWrapper>
                  <IndexText>A{index + 1}</IndexText>
                  {comparison[index]
                    ? <Answer $isCorrect={comparison[index]}>{data.userAnswer}</Answer>
                    : <div>
                      <StrikeThrough>{data.userAnswer}</StrikeThrough>
                      <Answer $isCorrect={comparison[index]}>{data.answer}</Answer>
                    </div>
                  }
                </TextWrapper>
                <TextWrapper>
                  <IndexText>E{index + 1}</IndexText>
                  <CommentaryText>{data.commentary}</CommentaryText>
                </TextWrapper>
              </CommentaryItemTextWrapper>
            </CommentaryItem>
          })}
        </CommentaryListWrapper>
      </ResultContent>
      <ButtonWrapper>
        <Button text='홈으로' onClick={goHome} />
      </ButtonWrapper>
    </ResultWrapper>
  );
};

const ResultWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 130px);
  background: ${colors.silver};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultContent = styled.div`
  width: calc(100% - 2rem);
  max-width: 800px;
  min-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
  background: ${colors.white};
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h2`
    font-size: 1.5rem;
`;

const ResultText = styled.div`
  margin-top: 32px;
  font-size: 1rem;
`;

const CommentaryListWrapper = styled.ul`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentaryItem = styled.li<{ $isCorrect: boolean }>`
  list-style: none;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  border: 1px solid ${(props) => (props.$isCorrect ? colors.green : colors.red)};
  border-radius: 8px;
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentaryItemTextWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1.5rem 1fr;
`

const IndexText = styled.span`
  font-size: 1rem;
  color: ${colors.grayPale};
`;

const StrikeThrough = styled.span`
    color: ${colors.grayPale};
    font-size: 1rem;
    text-decoration: line-through;
`;

const Answer = styled.span<{ $isCorrect: boolean }>`
    color: ${(props) => (props.$isCorrect ? colors.green : colors.red)};
    font-size: 1rem;
    margin-left: 8px;
    word-break: break-word;
    overflow-wrap: break-word; 
`;

const CommentaryText = styled.div`
  font-size: 1rem;
  color: ${colors.grayDark};
  word-break: break-word;
  overflow-wrap: break-word; 
`;

const ButtonWrapper = styled.div`
  margin: 1.5rem auto;
`;

export default ResultPage;