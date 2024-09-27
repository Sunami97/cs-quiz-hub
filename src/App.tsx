import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './layout/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import QuizSelectPage from './pages/QuizSelectPage';
import QuizPage from './pages/QuizPage.tsx';
import ResultPage from './pages/ResultPage.tsx';
import Footer from './layout/Footer.tsx';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz-select" element={<QuizSelectPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Main>
        <Footer />
      </Router>
    </>
  );
}

const Main = styled.main`
    flex: 1; 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top : 72px;
    margin-bottom: 58px;
  `;
export default App;
