import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import arrowDownIcon from '../assets/svg/arrow-down-svgrepo-com.svg'
import { colors } from '../color';

interface CustomSelectProps {
    options: string[];
    defaultOption?: string;
    onSelect: (option: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, defaultOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownButton onClick={() => setIsOpen(!isOpen)} $icon={arrowDownIcon}>
                {selectedOption}
            </DropdownButton>
            {isOpen && (
                <DropdownList>
                    {options.map((option) => (
                        <DropdownListItem
                            key={option}
                            selected={option === selectedOption}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </DropdownListItem>
                    ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    );
};

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.div<{ $icon: string }>`
  width: 100%;
  padding: 10px;
  background-color: ${colors.white};
  border: 1px solid ${colors.grayPale};
  color: ${colors.grayLighter};
  border-radius: 4px;
  cursor: pointer;
  text-align: left; 

  background: url(${(props) => props.$icon});
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 9px;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${colors.grayPale};
  border-radius: 4px;
  background-color: ${colors.white};
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownListItem = styled.li<{ selected: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.selected ? colors.primaryPale : colors.white)};
  color: ${(props) => (props.selected ? colors.primary : colors.grayLighter)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? colors.primaryPale : colors.silver)};
    color: ${(props) => (props.selected ? colors.primary : colors.grayLighter)};
  }
`;

export default CustomSelect;
