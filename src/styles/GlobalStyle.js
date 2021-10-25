import { createGlobalStyle, keyframes } from 'styled-components';
import PompiereTTF from '../assets/fonts/Pompiere-Regular.ttf';
import PompiereWoff from '../assets/fonts/Pompiere.woff';
import PompiereWoff2 from '../assets/fonts/Pompiere.woff2';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pompiere';
    font-style: normal;
    font-weight: 400;
    font-display: auto;
    src: url(${PompiereWoff}) format('woff'), url(${PompiereWoff2}) format('woff2'), url(${PompiereTTF}) format('ttf'),;
  }
  @font-face {font-family: "Pompiere"; src: url("//db.onlinewebfonts.com/t/fd4f7a6c707089988f46815c42c5fc8d.eot"); src: url("//db.onlinewebfonts.com/t/fd4f7a6c707089988f46815c42c5fc8d.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/fd4f7a6c707089988f46815c42c5fc8d.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/fd4f7a6c707089988f46815c42c5fc8d.woff") format("woff"), url("//db.onlinewebfonts.com/t/fd4f7a6c707089988f46815c42c5fc8d.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/fd4f7a6c707089988f46815c42c5fc8d.svg#Pompiere") format("svg"); }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pompiere';
    color: hsl(0, 0%, 100%);
  }

  html {
    background: linear-gradient(120deg,#004c82,#00649c,#247db7,#4997d3,#69b1f0,#86cdff) no-repeat center center fixed;
    background-size: 180% 180%;
    animation: gradient-animation 8s ease infinite;
    scroll-behavior: smooth;


    @keyframes gradient-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
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
    font-size: 1.15rem;
  }

  h6 {
    font-size: 1.1rem;
  }

  input, p {
    font-size: 1rem;
  }
`;

export default GlobalStyle;

// Animation
export const slideInBottom = keyframes`
	from {
		transform: translateY(200px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
`;

export const slideInLeft = keyframes`
	from {
		transform: translateX(-100px);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
`;

export const slideInRight = keyframes`
	from {
		transform: translateX(100px);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
`;

export const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
