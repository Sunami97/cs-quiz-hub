import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 CSQuizHub. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
        width: 100%;
        height: 58px;
        text-align: center;
        background-color: #E93737;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        bottom: 0;
        z-index: 999;
      `;

const FooterText = styled.span`
        color: white;
        font-size: 1rem;
        text-align: center;
      `;

export default Footer;