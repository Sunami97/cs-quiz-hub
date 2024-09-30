import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import styled from 'styled-components';
import Button from '../components/Button';
import { colors } from '../color';
import activeEllipse from '../assets/img/activeEllipse.png';
import defaultEllipse from '../assets/img/defaultEllipse.png'
import hoverEllipse from '../assets/img/hoverEllipse.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Quiz, MultipleChoice } from '../types/QuizType'


const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizData: Quiz = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionCount: number = quizData.Item.length;

  const [selectedOption, setSelectedOption] = useState<string>('');

  const [userAnswer, setUserAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    if (!isQuizFinished) {
      return;
    }

    const result = userAnswer.map((userAnswer, index) => {
      const questionData = quizData.Item[index];

      return {
        question: questionData.question,
        answer: questionData.answer,
        userAnswer,
        commentary: questionData.commentary
      }
    })

    navigate('/result', { state: result });
  }, [isQuizFinished, navigate, quizData, userAnswer]);

  const addAnswer = () => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      return updatedAnswers;
    });
  };

  const nextQuestion = () => {
    addAnswer();

    if (currentQuestionIndex + 1 >= questionCount) {
      setIsQuizFinished(true);
      return;
    }

    setSelectedOption('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const prevQuestion = () => {
    if (currentQuestionIndex === 0) {
      return;
    }

    const prevIndex = currentQuestionIndex - 1;
    setSelectedOption(userAnswer[prevIndex]);
    setCurrentQuestionIndex(prevIndex);
  }

  const renderQuiz = (quiz: Quiz): JSX.Element => {
    switch (quiz.Type) {
      case "객관식":
        return <OptionList>
          {(quizData.Item as MultipleChoice[])[currentQuestionIndex].options.map((option, index) => (
            <Option
              key={index}
              $isSelected={option === selectedOption}
              $activeEllipse={activeEllipse}
              $defaultEllipse={defaultEllipse}
              $hoverEllipse={hoverEllipse}
              onClick={() => setSelectedOption(option)}
            >{option}
            </Option>
          ))}
        </OptionList>

      case "참 또는 거짓":
        return <TrueOrFalseContainer>
          <TrueOrFalseSelectBox
            $isSelected={'O' === selectedOption}
            onClick={() => setSelectedOption('O')}>
            <FontAwesomeIcon icon={faCircle} />
          </TrueOrFalseSelectBox>
          <TrueOrFalseSelectBox
            $isSelected={'X' === selectedOption}
            onClick={() => setSelectedOption('X')}>
            <FontAwesomeIcon icon={faX} />
          </TrueOrFalseSelectBox>
        </TrueOrFalseContainer>

      case "빈칸 채우기":
        return <FillBlankContainer>

        </FillBlankContainer>

      default:
        return <p>Invalid quiz type</p>;
    }
  };

  return (
    <QuizPageWrapper>
      <QuizContent>
        <ProgressContent>
          <ProgressBar percentage={(currentQuestionIndex + 1) / questionCount * 100} />
          <ProgressText>{currentQuestionIndex + 1}/{questionCount}</ProgressText>
        </ProgressContent>
        <QuestionWrapper>
          <QuestionIndex>Q{currentQuestionIndex + 1}</QuestionIndex>
          <QuestionText>{quizData.Item[currentQuestionIndex].question}</QuestionText>
        </QuestionWrapper>
        {renderQuiz(quizData)}
      </QuizContent>
      <ButtonWrapper>
        <Button text='이전' color={colors.grayPale} onClick={prevQuestion} />
        <Button text='다음' onClick={nextQuestion} disabled={selectedOption === ''} />
      </ButtonWrapper>
    </QuizPageWrapper>
  );
};

const QuizPageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 130px);
  background: ${colors.silver};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizContent = styled.div`
  width: calc(100% - 2rem);
  max-width: 800px;
  min-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
  background: ${colors.white};
  border-radius: 24px;
  overflow: hidden;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
`;

const ProgressContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
`

const ProgressText = styled.span`
  color: ${colors.lightGray};
  margin-top: 8px;
  font-size: 1rem;
`;

const QuestionWrapper = styled.div`
margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const QuestionIndex = styled.h2`
  font-size: 1.5rem;
  color: ${colors.grayPale};
`;

const QuestionText = styled.span`
  color: ${colors.grayDark};
  font-size: 1.25rem;
`
const OptionList = styled.ul`
  list-style-type: none;
  margin-top: 16px;
 `;

const Option = styled.li<{ $isSelected: boolean, $activeEllipse: string, $defaultEllipse: string, $hoverEllipse: string }>`
  min-width: 200px;
  color: ${({ $isSelected }) => ($isSelected ? colors.primaryLighter : colors.grayDark)};
  padding: 16px 24px;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? colors.primaryLighter : colors.grayPale)};
  border-radius: 8px;
  margin-top: 24px;
  overflow: auto;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;
    
  background: url(${(props) => props.$isSelected ? props.$activeEllipse : props.$defaultEllipse});
  background-repeat: no-repeat;
  background-position: right 24px center;
  background-size: 28px;

  &:hover {
    background: url(${(props) => props.$isSelected ? props.$activeEllipse : props.$hoverEllipse});
    background-repeat: no-repeat;
    background-position: right 24px center;
    background-size: 28px;
    transform: scale(1.025);
  } 
`;

const TrueOrFalseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;

const TrueOrFalseSelectBox = styled.div<{ $isSelected: boolean }>`
 margin-top: 32px;
  width: 340px;
  height: 400px;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? colors.primaryLighter : colors.grayPale)};
  border-radius: 8px;
  transition: transform 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: ${({ $isSelected }) => ($isSelected ? colors.primaryLighter : colors.grayPale)};

  &:hover{
    transform: scale(1.025);
  }
`;

const FillBlankContainer = styled.div`
  
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin: 1.5rem auto;
`;


export default QuizPage;