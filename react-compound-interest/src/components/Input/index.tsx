import React, { InputHTMLAttributes, FC, useState, useCallback } from 'react';

import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: FC<IInputProps> = ({ label, name, ...rest }) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleOnBlur = useCallback(() => {
    setIsFilled(!!rest.value);
  }, [rest.value]);

  return (
    <Container isFilled={isFilled}>
      <input id={name} onBlur={handleOnBlur} {...rest} />
      <label htmlFor={name}>{label}</label>
    </Container>
  );
};

export default Input;
