import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';


const Header: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={goHome}>
        <Logo src={logo} alt="Logo" />
        <LogoText>CSQuizHub</LogoText>
      </LogoWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
    width: 100%;
    height: 72px;
    text-align: center;
    background-color: #E93737;
    display: flex;
    justify-content: start;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 999;
  `;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer; 
    margin-left: 40px; 
  `;

const Logo = styled.img`
    width: 48px;
    height: 48px; 
  `;

const LogoText = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 7px;
    color: white;
  `;

export default Header;
