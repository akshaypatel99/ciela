import { createGlobalStyle } from 'styled-components';
import sky from '../assets/images/sky.jpg';
import Metropolis from '../assets/fonts/Metropolis-Regular.woff2';
import MetropolisMedium from '../assets/fonts/Metropolis-Medium.woff2';
import MetropolisSemiBold from '../assets/fonts/Metropolis-SemiBold.woff2';
import SourceSansPro from '../assets/fonts/source-sans-pro-v14-latin-regular.woff2';
import SourceSansProBold from '../assets/fonts/source-sans-pro-v14-latin-700.woff2';
import SourceSansProSemiBold from '../assets/fonts/source-sans-pro-v14-latin-600.woff2';
import Playball from '../assets/fonts/Playball-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playball&family=Poppins&display=swap');

  @font-face {
    font-family: 'Metropolis';
    font-style: normal;
    font-weight: 400;
    src: url(${Metropolis}) format('woff2');
  }
  @font-face {
    font-family: 'Metropolis Medium';
    font-style: normal;
    font-weight: 500;
    src: url(${MetropolisMedium}) format('woff2');
  }
  @font-face {
    font-family: 'Metropolis SemiBold';
    font-style: normal;
    font-weight: 600;
    src: url(${MetropolisSemiBold}) format('woff2');
  }
  @font-face {
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    src: url(${Playball}) format('ttf');
  }
  @font-face {
    font-family: 'SourceSansPro';
    font-style: normal;
    font-weight: 400;
    src: url(${SourceSansPro}) format('woff2');
  }
  @font-face {
    font-family: 'SourceSansPro Bold';
    font-style: normal;
    font-weight: 700;
    src: url(${SourceSansProBold}) format('woff2');
  }
  @font-face {
    font-family: 'SourceSansPro SemiBold';
    font-style: normal;
    font-weight: 600;
    src: url(${SourceSansProSemiBold}) format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'SourceSansPro';
    color: hsl(0, 0%, 100%);
  }

  html {
    background: url(${sky}) no-repeat center center fixed;
  }

  h1 {
    font-size: 4.2rem;
  }

  h2 {
    font-size: 1.8rem;
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
  }
`;

export default GlobalStyle;
