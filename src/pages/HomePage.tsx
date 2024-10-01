import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import wave from '../assets/img/wave.png';
import { colors } from '../color.ts';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz-select');
  };

  return (
    <HomeContainer>
      <TopContent>
        <MainTitle>
          Level Up Your<br />
          CS Skills
        </MainTitle>
        <SubTitle>CSQuizHub에서 CS지식을 재미있는 퀴즈로 쉽게 배우고 즐겨보세요!</SubTitle>
        <Button text="시작하기" onClick={startQuiz} color={colors.lightLemonYellow} textColor={colors.primary} />
      </TopContent>
      <QuizWrap>
      </QuizWrap>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  text-align: center;
  background-color: ${colors.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%; 
    height: 30%; 
    background-image: url(${wave}); 
    background-size: cover;
    z-index: 1; 
  }
`;

const TopContent = styled.div`
  width: calc(100% - 2rem);
  position: relative;
  z-index: 10;
`;

const MainTitle = styled.h2`
    color: ${colors.white};
    font-size: 5rem;
    font-weight: bold;
    margin-top: 48px;
`;

const SubTitle = styled.h2`
    margin: 24px;
    color: ${colors.white};
    font-size: 1.5rem;
`;

const QuizWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
`;

export default HomePage;
