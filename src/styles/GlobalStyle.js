import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    color: hsl(0, 0%, 90%);
  }

  h1 {
    font-weight: 600;
    font-size: 4rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4, p {
    font-size: 1rem;
  }

  h5 {
    font-size: 0.8rem;
  }

  h6 {
    font-size: 0.8rem;
  }

  ${
		'' /* @media (min-width:1024px){
    h1 {
      font-size: 3rem;
    }
  }

  @media (min-width:768px){
    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    h4, p {
      font-size: 1rem;
    }

    h5 {
      font-size: 0.8rem;
    }

    h6 {
      font-size: 0.8rem;
    }
  }

  @media (min-width:500px){
    h1 {
      font-size: 4rem;
    }

    h2 {
      font-size: 1.1rem;
    }

    h3 {
      font-size: 1rem;
    }

    h4, p {
      font-size: 0.9rem;
    }

    h5 {
      font-size: 0.8rem;
    }

    h6 {
      font-size: 0.8rem;
    }
  } */
	}
`;

export default GlobalStyle;
