import styled from 'styled-components';
import closeButton from '../../assets/img/close-button.png'
import Button from '../Button';
import CustomSelect from '../CustomSelect';
import { colors } from '../../color.ts';

type Options = {
    difficulty: string[];
    questionCount: string[];
    questionType: string[];
}

interface QuizOptionsModalProps {
    options: Options;
    difficulty: string;
    questionCount: string;
    questionType: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    setQuestionCount: React.Dispatch<React.SetStateAction<string>>;
    setQuestionType: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
    createQuiz: () => void;
}

const QuizOptionsModal: React.FC<QuizOptionsModalProps> = ({ options, difficulty, questionCount, questionType, setDifficulty, setQuestionCount, setQuestionType, onClose, createQuiz }) => {
    const handleDifficultySelect = (option: string) => {
        setDifficulty(option);
    };

    const handleQuestionCountSelect = (option: string) => {
        setQuestionCount(option);
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <ModalTitleWrapper>
                    <ModalTitle>옵션 선택</ModalTitle>
                    <ModalCloseButton src={closeButton} onClick={onClose} alt='close'></ModalCloseButton>
                </ModalTitleWrapper>
                {/* <p>{quiz.name}</p> */}
                <OptionWrapper>
                    <Label>난이도</Label>
                    <CustomSelect options={options.difficulty} defaultOption={difficulty} onSelect={handleDifficultySelect} />
                </OptionWrapper>
                <OptionWrapper>
                    <Label>문제 수</Label>
                    <CustomSelect options={options.questionCount} defaultOption={questionCount} onSelect={handleQuestionCountSelect} />
                </OptionWrapper>
                <OptionWrapper>
                    <Label>문제 유형</Label>
                    <ButtonGroup>
                        {options.questionType.map((type, index) =>
                            <StyledButton
                                key={index}
                                $isSelected={questionType === type}
                                onClick={() => setQuestionType(type)}
                            >{type}</StyledButton>
                        )}
                    </ButtonGroup>
                </OptionWrapper>
                <Button text='퀴즈 생성' onClick={createQuiz} />
            </ModalContent>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 384px;
    min-width: 300px;
    background: ${colors.white};
    padding: 1.5rem;
    margin: 0 2rem;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 24px;
`;

const ModalTitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; 
`;

const ModalTitle = styled.h2`
    font-size: 1.2rem;
`;

const ModalCloseButton = styled.img`
    position: absolute;
    right: 0;
    cursor: pointer;
`;

const Label = styled.label`
    text-align: start;
    font-size: 1rem;
`;

const OptionWrapper = styled.div`
    display: flex;  
    flex-direction: column;
    gap: 8px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 8px;
`;

const StyledButton = styled.button <{ $isSelected: boolean }> `
    flex: 1;
    padding: 10px 16px;
    font-size: 0.8rem;
    border-radius: 24px;
    border: none;
    background-color: ${({ $isSelected }) => ($isSelected ? colors.primaryPale : colors.silver)};
    color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.grayLighter)};
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

export default QuizOptionsModal;
