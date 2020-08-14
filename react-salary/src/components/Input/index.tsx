import React, { InputHTMLAttributes, FC } from 'react';

import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: FC<IInputProps> = ({ label, name, ...rest }) => {
  return (
    <Container>
      <input id={name} {...rest} />
      <label htmlFor={name}>{label}</label>
    </Container>
  );
};

export default Input;
