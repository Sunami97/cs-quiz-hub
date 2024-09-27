import React from 'react';
import styled from 'styled-components';
import { colors } from '../color';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarFill $percentage={percentage} />
    </ProgressBarWrapper>
  );
};

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${colors.silver};
  border-radius: 24px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  background-color: ${colors.primary};
  height: 100%;
  transition: width 0.3s ease-in-out;
  border-radius: 25px 0 0 25px;
`;

export default ProgressBar;