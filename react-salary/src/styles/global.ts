import { createGlobalStyle } from 'styled-components';

import '../../node_modules/react-vis/dist/style.css';

export default createGlobalStyle`
  :root {
    --primary-color: #ff9000;
    --inss-color: #E22837;
    --irpf-color: cyan;
    --bg-color: #28262e;
    --text-color: #f0f0f5;
    --light-color: rgba(255, 255, 255, 0.04);
    --label-color: rgba(255, 255, 255, 0.6);
    --sp-color: #fff;
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
