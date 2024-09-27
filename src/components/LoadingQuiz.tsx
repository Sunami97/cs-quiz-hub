import styled, { keyframes } from 'styled-components';
import { colors } from '../color';

const LoadingQuiz = () => {
  return (
    <LoadingWrapper>
      <DotWrapper>
        <Dot />
        <Dot />
        <Dot />
      </DotWrapper>
      <CreateQuizText>퀴즈를 생성하고 있어요</CreateQuizText>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DotWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0.5);
  } 
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Dot = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${colors.primaryLighter};
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 2.4s infinite ease-in-out both; 
  
  &:nth-child(1) {
    animation-delay: -0.48s; 
  }

  &:nth-child(2) {
    animation-delay: -0.24s;
  }
`;

const CreateQuizText = styled.h2`
  color: ${colors.grayDark};
  margin: 32px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
`

export default LoadingQuiz;