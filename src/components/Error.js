import styled from 'styled-components';

const Error = ({ error }) => {
	return (
		<StyledError>
			<h4>{error}</h4>
		</StyledError>
	);
};

export default Error;

const StyledError = styled.div`
	margin: 2rem auto;
	height: auto;
	display: flex;
	place-items: center;
	padding: 1rem;
	background: hsl(0, 0%, 100%, 0.1);
	box-shadow: 0 8px 16px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 2px solid hsl(4, 62%, 56%, 1);
	opacity: 1;

	h4 {
		text-align: center;
	}
`;
