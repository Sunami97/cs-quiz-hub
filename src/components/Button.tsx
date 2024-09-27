import React from 'react';
import styled from 'styled-components';
import { colors } from '../color';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, color }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} color={color}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ color?: string }>`
  padding: 8px 24px;
  background-color: ${({ color }) => (color ? color : colors.primary)};
  color: ${colors.white};
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ color }) => (color ? 'darken(0.1, color)' : colors.primaryDark)};
  }
`;

export default Button;
