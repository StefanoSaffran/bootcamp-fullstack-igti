import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(1000px, 100%);
  margin: 70px auto 0;
  padding: 0 20px;

  position: relative;

  h1 {
    font-size: 4rem;
  }

  div {
    svg {
      path.salary {
        fill: var(--primary-color) !important;
      }
      path.irpf {
        fill: var(--irpf-color) !important;
      }
      path.inss {
        fill: var(--inss-color) !important;
      }
    }
  }
`;

export const Results = styled.div`
  margin-top: 20px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 45px;
    border-bottom: 1px solid var(--label-color);

    > span {
      font-size: 0.8em;
      color: var(--label-color);
      letter-spacing: 0.1em;
      display: block;
    }

    & + div {
      margin-top: 10px;
    }

    strong {
      margin-bottom: 0.1rem;
    }
  }

  div:nth-child(2) {
    strong {
      color: var(--inss-color);
    }
  }

  div:nth-child(4) {
    strong {
      color: var(--irpf-color);
    }
  }

  @media (min-width: 700px) {
    flex-direction: row;

    div {
      width: 24%;

      strong {
        margin-bottom: 0.5rem;
      }

      & + div {
        margin-top: 0;
      }
    }
  }
`;

export const Salary = styled.div`
  width: 100%;
  margin: 30px 0;

  font-size: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-bottom: 2px solid var(--primary-color);

  padding-top: 20px;

  border-top: 1px solid var(--light-color);

  span {
    letter-spacing: 0.1em;
  }

  strong {
    color: var(--primary-color);
    margin: 0.5rem 0;
  }

  @media (min-width: 700px) {
    width: 30%;
    padding-top: 0;

    border-top: 0;
  }
`;
