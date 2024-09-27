import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ScrollAreaProps {
  children: React.ReactNode;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const checkScroll = () => {
    const element = scrollRef.current;
    if (element) {
      const isScrollable = element.scrollHeight > element.clientHeight;
      setHasScroll(isScrollable);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  return (
    <ScrollBarWrapper ref={scrollRef} $hasScroll={hasScroll}>
      {children}
    </ScrollBarWrapper>
  );
};

const ScrollBarWrapper = styled.div<{ $hasScroll: boolean }>`
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: ${({ $hasScroll }) => ($hasScroll ? '1.5rem' : '0')};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ebedef;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export default ScrollArea;
