import { createGlobalStyle } from 'styled-components';
import sky from '../assets/images/sky.jpg';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playball&family=Poppins&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Metropolis', sans-serif;
    color: hsl(0, 0%, 100%);
  }

  html {
    background: url(${sky}) no-repeat center center fixed;
  }

  h1 {
    font-weight: 600;
    font-size: 4.2rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export default GlobalStyle;
