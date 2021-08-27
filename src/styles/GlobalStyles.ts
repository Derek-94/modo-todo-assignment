import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle<{ theme: any }>` 
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.color.bgColor};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  a, a:active, a:hover, a:visited {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  
  button, input {
    background-color: transparent;
    border: none;
    outline: none;
  }
  button {
    cursor: pointer;
  }

  select {
    outline:none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select::-ms-expand { display:none; } 
`;

export default GlobalStyles;
