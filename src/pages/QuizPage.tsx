import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import styled from 'styled-components';
import Button from '../components/Button';
import { colors } from '../color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faX, faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { Quiz, MultipleChoice } from '../types/QuizType'


const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizData: Quiz = useMemo(() => location.state, [location.state]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionCount: number = useMemo(() => quizData?.Item && quizData?.Item.length || 0, [quizData]);

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


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedOption !== '') {
      nextQuestion();
    }
  };

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
    if (!quizData.Type) return <ErrorText>퀴즈 생성 중 문제가 발생했습니다. 다시 퀴즈를 생성해주세요.</ErrorText>

    switch (quiz.Type) {
      case "객관식":
        return <OptionList>
          {(quizData.Item as MultipleChoice[])[currentQuestionIndex].options.map((option, index) => (
            <OptionContainer
              key={index}
              $isSelected={option === selectedOption}
              onClick={() => setSelectedOption(option)}
            >
              <OptionText $isSelected={option === selectedOption}>{option}</OptionText>
              <OptionIcon $isSelected={option === selectedOption}>
                <FontAwesomeIcon icon={option === selectedOption ? faCircleSolid : faCircle} />
              </OptionIcon>
            </OptionContainer>
          ))}
        </OptionList>

      case "OX 퀴즈":
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
        return <FillBlankInput
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          $isSelected={selectedOption !== ''}
          onKeyDown={handleKeyDown} />

      default:
        return <p>Invalid quiz type</p>;
    }
  };

  return (
    <QuizPageWrapper>
      {quizData.Item && quizData.Item.length > 0 ?
        <>
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
        </>
        :
        <ErrorText>퀴즈 생성 중 문제가 발생했습니다. 다시 퀴즈를 생성해주세요.</ErrorText>
      }
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

const ErrorText = styled.h2`
  margin: auto;
`

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

const OptionContainer = styled.li<{ $isSelected: boolean }>`
  min-width: 200px;
  padding: 16px 24px;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? colors.primary : colors.grayPale)};
  border-radius: 8px;
  margin-top: 24px;
  overflow: auto;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.grayDark)};

  &:hover {
    transform: scale(1.025);
  } 
`;

const OptionText = styled.span<{ $isSelected: boolean }>`
  font-size: 1rem;
`

const OptionIcon = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.grayPale)};
  font-size: 1.25rem;
`;

const TrueOrFalseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const TrueOrFalseSelectBox = styled.div<{ $isSelected: boolean }>`
 margin-top: 32px;
 padding: 10rem 5rem;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? colors.primary : colors.grayPale)};
  border-radius: 8px;
  transition: transform 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.grayPale)};

  &:hover{
    transform: scale(1.025);
  }

  @media (max-width: 768px) {
    padding: 7rem 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 5rem 2.5rem;
  }
`;

const FillBlankInput = styled.input<{ $isSelected: boolean }>`
  margin-top: 32px;
  padding: 1.5rem 1rem;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? colors.primaryLighter : colors.grayPale)};
  border-radius: 8px;
  color: ${colors.grayDark};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.primaryLighter};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin: 1.5rem auto;
`;


export default QuizPage;