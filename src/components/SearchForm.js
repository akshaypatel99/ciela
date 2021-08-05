import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const SearchForm = ({
	weatherHandler,
	city,
	cityHandler,
	showSearch,
	setShowSearch,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<SearchInput>
			<form onSubmit={weatherHandler}>
				<input
					name='city'
					type='text'
					placeholder='Enter city & country'
					value={city}
					onChange={cityHandler}
					ref={inputRef}
					tabindex='3'
					onKeyDown={(event) => {
						if (event.key === 'Escape') {
							setShowSearch(!showSearch);
						}
					}}
				/>
				<button
					onClick={weatherHandler}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							weatherHandler();
						}
					}}
					onTouchStart={weatherHandler}
					type='submit'
				>
					Get Weather
				</button>
			</form>
			<p>For best results, enter postcode, city & country.</p>
		</SearchInput>
	);
};

export default SearchForm;

const SearchInput = styled.div`
	margin-bottom: 0.5rem;

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem;
		border-radius: 2rem;
		border: 1px solid white;
		background: hsl(208, 21%, 88%);
	}

	input {
		background: transparent;
		border: none;
		outline: none;
		color: #555;
		font-size: 0.8rem;
		font-family: 'SourceSansPro SemiBold';
		text-align: center;
		text-transform: capitalize;

		input:focus {
			background: none;
		}
	}

	button {
		display: none;
	}

	p {
		font-size: 0.75rem;
		text-align: center;
		padding-top: 0.75rem;
	}

	@media (min-width: 500px) {
		input {
			font-size: 1rem;
		}
	}
`;