import React from 'react';
import styled from 'styled-components';
import { colors } from '../color';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  textColor?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, color, textColor }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} color={color} $textColor={textColor}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ color?: string, $textColor?: string }>`
  padding: 8px 24px;
  background-color: ${({ color }) => (color ? color : colors.primary)};
  color: ${({ $textColor }) => ($textColor ? $textColor : colors.white)};
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: transform 0.2s;

  &:hover {
    background-color: ${({ color }) => (color ? 'darken(0.1, color)' : colors.primaryDark)};
    transform: scale(1.05);
  }
`;

export default Button;
