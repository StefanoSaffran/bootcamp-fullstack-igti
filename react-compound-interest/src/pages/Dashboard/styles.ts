import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(1280px, 100%);
  margin: 40px auto;
  padding: 0 20px;

  h1 {
    font-size: 4rem;
  }

  form {
    width: 100%;
  }

  div.recharts-responsive-container {
    display: flex;
    div.recharts-wrapper {
      display: flex;
      align-self: center;
      align-items: center;
    }
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: 40px;

  > div {
    width: 32%;
  }
`;
