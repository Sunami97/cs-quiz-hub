import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import Header from './layout/Header.tsx';
import Footer from './layout/Footer.tsx';
import LoadingQuiz from './components/LoadingQuiz.tsx';

const HomePage = React.lazy(() => import('./pages/HomePage.tsx'));
const QuizSelectPage = React.lazy(() => import('./pages/QuizSelectPage'));
const QuizPage = React.lazy(() => import('./pages/QuizPage.tsx'));
const ResultPage = React.lazy(() => import('./pages/ResultPage.tsx'));

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <Suspense fallback={<LoadingQuiz loadingText='잠시만 기다려주세요' />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select" element={<QuizSelectPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Suspense>
      </Main>
      <Footer />
    </Router>
  );
}

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 72px;
`;

export default App;
