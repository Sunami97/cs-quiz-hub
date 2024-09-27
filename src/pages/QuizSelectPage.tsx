import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import QuizItem from '../components/QuizItem';
import prevButton from '../assets/img/prev-button.png'
import QuizOptionsModal from '../components/Modal/QuizOptionsModal';
import { quizTopic } from '../types/quizTopic';
import { colors } from '../color.ts';
import LoadingQuiz from '../components/LoadingQuiz.tsx';
import quizData from '../data/questions.json'


const quizTopics: quizTopic[] = [
  { id: 'html-css', name: 'HTML / CSS', description: '웹 페이지의 구조와 콘텐츠를 정의하고 디자인과 스타일을 지정하는 기술' },
  { id: 'javascript', name: '자바스크립트', description: '객체 기반의 스크립트 프로그래밍 언어' },
  { id: 'framework-library', name: '프레임워크 및 라이브러리', description: '기본 구조와 가이드라인을 제공하여 개발을 더 쉽게 해주는 도구' },
  { id: 'network', name: '네트워크', description: '여러 장치들이 데이터를 서로 주고받기 위해 연결된 시스템' },
  { id: 'os', name: '운영체제', description: '사용자와 프로그램 간의 상호작용을 제어하는 소프트웨어 시스템' },
  { id: 'algorithm-datastructure', name: '알고리즘 및 자료구조', description: '데이터를 효율적으로 저장하고 관리하기 위한 구조적 방식' },
  { id: 'software-architecture', name: '소프트웨어 아키텍처', description: '시스템의 구조와 구성 요소들 간의 상호작용을 정의하는 설계' },
  { id: 'cloud-deployment', name: '클라우드와 배포', description: '인터넷을 통해 애플리케이션을 실행할 수 있는 원격 서버 기반의 서비스' },
];

const options = {
  difficulty: ['초급', '중급', '고급'],
  // difficulty: ['easy', 'medium', 'hard'],
  questionCount: ['5', '10', '20'],
  questionType: ['객관식', 'OX 퀴즈', '빈칸 맞추기']
  // questionType: ['multiple-choice', 'ox-quiz', 'fill-in-the-blank']
}

const QuizSelectPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<quizTopic | null>(null);

  const [difficulty, setDifficulty] = useState('초급');
  const [questionCount, setQuestionCount] = useState('5');
  const [questionType, setQuestionType] = useState('객관식');

  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  const navigate = useNavigate();

  const handleQuizSelect = (quiz: quizTopic) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setDifficulty('초급');
    setQuestionCount('5');
    setQuestionType('객관식')
    setIsModalOpen(false);
  };

  const goQuizPage = () => {
    setIsLoadingQuiz(true);
    const timer = setTimeout(() => {

      navigate('/quiz', { state: quizData });
    }, 2000);

    return () => clearTimeout(timer);
  }

  const goHome = () => {
    navigate('/');
  };


  return (
    <QuizSelectContainer>
      {isLoadingQuiz ? (
        <LoadingQuiz />
      ) : (
        <QuizSelectWrapper>
          <QuizSelectTopWrapper>
            <PrevButton src={prevButton} alt="prevButton" onClick={goHome} />
            <QuizSelectTitle>주제 선택</QuizSelectTitle>
          </QuizSelectTopWrapper>
          <QuizItemContainer>
            {quizTopics.map((quiz) => (
              <QuizItem
                key={quiz.id}
                id={quiz.id}
                title={quiz.name}
                description={quiz.description}
                onClick={() => handleQuizSelect(quiz)}
              />
            ))}
          </QuizItemContainer>
          {isModalOpen && selectedQuiz && (
            <QuizOptionsModal
              options={options}
              difficulty={difficulty}
              questionCount={questionCount}
              questionType={questionType}
              setDifficulty={setDifficulty}
              setQuestionCount={setQuestionCount}
              setQuestionType={setQuestionType}
              createQuiz={() => {
                goQuizPage(); // 퀴즈 페이지로 이동
              }}
              onClose={handleCloseModal}
            />
          )}
        </QuizSelectWrapper>
      )}
    </QuizSelectContainer>
  );
};

const QuizSelectContainer = styled.div`
    max-width: 1200px;
    width: calc(100% - 2rem);
  `;

const QuizSelectWrapper = styled.div`
    margin: 50px 0;
  `;

const QuizSelectTopWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  `

const PrevButton = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  `

const QuizSelectTitle = styled.h2`
    width: 100%;
    font-size: 2rem;
    color: ${colors.grayDark};
    text-align: start;
    margin-left: 24px;
  `;

const QuizItemContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    column-gap: 24px; 
    row-gap: 32px; 
    justify-items: center;

    @media (max-width: 1025px) {
      grid-template-columns: repeat(3, 1fr); 
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr); 
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr; 
    }
  `;

export default QuizSelectPage;
