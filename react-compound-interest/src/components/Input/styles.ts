import styled, { css } from 'styled-components';

interface IContainerProps {
  isFilled: boolean;
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  position: relative;
  display: flex;
  margin-top: 20px;

  input {
    width: 100%;
    flex: 1;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    padding: 12px 0;
    border: none;
    border-bottom: 1px solid var(--primary-color);
    background-color: transparent;
  }

  input ~ label {
    position: absolute;
    top: 12px;
    left: 0;
    color: var(--label-color);
    transition: 0.4s;
    pointer-events: none;
  }

  input:focus ~ label,
  input:valid ~ label {
    transform: translateY(-24px);
    font-size: 0.8em;
    letter-spacing: 0.1em;
  }

  input:invalid ~ label {
    display: block;
    ${({ isFilled }) =>
      isFilled &&
      css`
        transform: translateY(-24px);
        font-size: 0.8em;
        letter-spacing: 0.1em;
        color: red;
      `}
  }
`;
