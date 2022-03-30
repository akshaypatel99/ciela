import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../styles/GlobalStyle';
import { CSSTransition } from 'react-transition-group';
import { useGeoPosition } from '../utils/useGeoposition';

import Current from '../components/Current';
import Daily from '../components/Daily';
import Hourly from '../components/Hourly';
import Minutely from '../components/Minutely';
import Loader from '../components/Loader';

import DailyDetail from '../components/DailyDetail';
import HourlyDetail from '../components/HourlyDetail';
import SearchForm from '../components/SearchForm';
import MenuSelect from '../components/MenuSelect';

const Home = () => {
	const [city, setCity] = useState('');
	const [geoLoading, setGeoLoading] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [error, setError] = useState('');
	const { status: geoStatus, position, error: geoError } = useGeoPosition();
	const [method, setMethod] = useState({
		route: 'coords',
		position: position || {},
		city: city || '',
	});

	const location = useLocation();
	const pathId = location.pathname.split('/')[2];
	const pathDiv = location.pathname.split('/')[1];

	const today = new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const getGeolocation = () => {
		if (geoStatus === 'idle' || geoStatus === 'pending') {
			return setGeoLoading(true);
		}

		if (geoStatus === 'rejected') {
			setGeoLoading(false);
			return setError(geoError.message);
		}

		if (geoStatus === 'resolved') {
			setError('');
			setCity('');
			setGeoLoading(false);
			setMethod({ ...method, route: 'coords', position: position });
			setShowResults(true);
			return;
		}
	};

	const cityHandler = (e) => {
		e.preventDefault();
		setCity(e.target.value);
	};

	const weatherHandler = async (e) => {
		e.preventDefault();
		setGeoLoading(true);
		setMethod({ ...method, route: 'city', city: city });
		setGeoLoading(false);
		setShowSearch(false);
		setShowResults(true);
		return;
	};

	return (
		<StyledHome>
			{pathDiv === 'daily' && pathId && (
				<DailyDetail pathId={pathId} method={method} />
			)}
			{pathDiv === 'hourly' && pathId && (
				<HourlyDetail pathId={pathId} method={method} />
			)}

			<Container>
				<Banner>
					<h1>Ciela</h1>
					<h4>{today}</h4>
				</Banner>

				<Menu>
					<MenuTop>
						<MenuSelect
							getGeolocation={getGeolocation}
							setShowSearch={setShowSearch}
							showSearch={showSearch}
						/>
					</MenuTop>

					<CSSTransition
						in={showSearch}
						timeout={{
							appear: 100,
							enter: 100,
							exit: 100,
						}}
						appear
						mountOnEnter
						unmountOnExit
					>
						<MenuBottom>
							<SearchForm
								weatherHandler={weatherHandler}
								city={city}
								cityHandler={cityHandler}
								setShowSearch={setShowSearch}
								showSearch={showSearch}
							/>
						</MenuBottom>
					</CSSTransition>
				</Menu>

				<Results>
					{error && (
						<StyledError>
							<h4>{error}</h4>
						</StyledError>
					)}
					{geoLoading ? <Loader /> : null}

					{showResults && (
						<>
							<Current city={city} method={method} />
							<Daily method={method} />
							<Hourly method={method} />
							<Minutely method={method} />
						</>
					)}
				</Results>
			</Container>
		</StyledHome>
	);
};

const StyledHome = styled.div`
	min-width: 100%;
	min-height: 100%;

	.home__nav {
		position: absolute;
		top: 2rem;
		left: 2rem;
		cursor: pointer;
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	padding: 2rem;

	@media (min-width: 500px) {
		max-width: 500px;
	}

	@media (min-width: 768px) {
		max-width: 600px;
	}
`;

const Banner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 3rem;

	h1 {
		margin-bottom: 1rem;
		font-weight: 400;
	}

	h4 {
		text-transform: uppercase;
		font-weight: 400;
	}
`;

const Menu = styled.div`
	width: 90%;
	max-width: 536px;
	margin: 0 auto 3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background: hsl(0, 0%, 100%, 0.2);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);
	animation: ${fadeIn} 0.6s ease-in 0s 1 normal forwards running;
`;

const MenuTop = styled.div`
	width: 100%;
	height: 5rem;
`;

const MenuBottom = styled.div`
	height: 0rem;
	width: 90%;
	margin-top: 2rem;

	&.enter {
		opacity: 0;
		height: 0rem;
	}

	&.enter-active {
		opacity: 1;
		height: 5rem;
		transition: opacity 500ms, height 200ms;
	}

	&.enter-done {
		height: 5rem;
	}

	&.exit {
		opacity: 1;
		height: 5rem;
	}
	&.exit-active {
		opacity: 0;
		height: 0rem;
		transition: opacity 200ms, height 200ms;
	}

	.menu__bottom__form {
		p {
			text-align: center;
		}
	}
`;

const Results = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

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

export default Home;
