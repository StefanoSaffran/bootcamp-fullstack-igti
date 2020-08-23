import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #6842C2;
    --bg-color: #F0F0F7;
    --text-color: #32264D;
    --dark-color: rgba(0, 0, 0, 0.04);
    --label-color: rgba(0, 0, 0, 0.6);
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  #root {
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    background: var(--bg-color);
  }

 body, input, button, textarea, input::placeholder, textarea::placeholder {
    font: 500 1.6rem Roboto, sans-serif;
    border: 0;
    color: var(--text-color);
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }

  @media (max-width: 420px) {
    :root {
      font-size: 55.5%;
    }
  }
`;
