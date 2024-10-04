import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../color';

type QuizProps = {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
};

const QuizItem: React.FC<QuizProps> = ({ id, title, description, onClick }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../assets/img/${id}.png`);
        setImageSrc(image.default);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [id]);

  return (
    <ItemWrap onClick={onClick}>
      <ItemImageWrap>
        {imageSrc ? <ItemImage src={imageSrc} alt={title} /> : <p></p>}
      </ItemImageWrap>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  max-width: 282px;
  text-align: start;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    text-align: center;
    }
`;

const ItemImageWrap = styled.div`
  position: relative;
  margin-bottom: 0.5em;
`;

const ItemImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
`;

const ItemTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 16px;
  margin-bottom: 8px;
  color: ${colors.grayDark};
`;

const ItemDescription = styled.p`
  font-size: 1rem;
  color: ${colors.grayLighter};
`;

export default QuizItem;