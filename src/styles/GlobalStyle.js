import { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Barlow Condensed';
    font-weight: 400;
    color: hsl(0, 0%, 100%);
  }

  body {
    background: linear-gradient(120deg,#004c82,#00649c,#247db7,#4997d3,#69b1f0) no-repeat center center fixed;
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
    font-weight: 300;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 300;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  h5 {
    font-size: 1.15rem;
    font-weight: 400;
  }

  h6 {
    font-size: 1.1rem;
    font-weight: 400;
  }

  input, p {
    font-size: 1rem;
    font-weight: 400;
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
