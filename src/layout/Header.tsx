import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={goHome}>
        <Logo>
          <FontAwesomeIcon icon={faLaptopCode} />
        </Logo>
        <LogoText>CSQuizHub</LogoText>
      </LogoWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
    width: 100%;
    height: 72px;
    text-align: center;
    background-color: ${colors.primary};;
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
    margin-left: 2rem; 
  `;

const Logo = styled.div`
    color: ${colors.white};
    font-size: 1.5rem;
  `;

const LogoText = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 7px;
    color: white;
  `;

export default Header;
