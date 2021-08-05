import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fadeIn } from '../styles/GlobalStyle';
import { CSSTransition } from 'react-transition-group';

import Current from '../components/Current';
import Daily from '../components/Daily';
import Hourly from '../components/Hourly';
import Minutely from '../components/Minutely';
import Loader from '../components/Loader';

import DailyDetail from '../components/DailyDetail';
import HourlyDetail from '../components/HourlyDetail';
import {
	getCoordsWeather,
	getCityWeather,
} from '../redux/actions/weatherActions';
import SearchForm from '../components/SearchForm';
import MenuSelect from '../components/MenuSelect';

const Home = () => {
	const [city, setCity] = useState('');
	const [geoLoading, setGeoLoading] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [error, setError] = useState('');
	const isLoading = useSelector((state) => state.isLoading);
	const weather = useSelector((state) => state.weather);
	const apiError = useSelector((state) => state.error);

	const dispatch = useDispatch();
	const location = useLocation();
	const pathId = location.pathname.split('/')[2];
	const pathDiv = location.pathname.split('/')[1];

	const cityHandler = (e) => {
		e.preventDefault();
		setCity(e.target.value);
	};

	const weatherHandler = async (e) => {
		e.preventDefault();
		setGeoLoading(true);
		dispatch(getCityWeather(city));
		setGeoLoading(false);
		setShowSearch(false);
	};

	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const today = new Date().toLocaleDateString('en-GB', options);

	const coordsWeather = async (position) => {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		console.log('lat', lat, 'lon', lon);
		dispatch(getCoordsWeather(lat, lon));
		setCity('');
		setGeoLoading(false);
	};

	const coordsError = (error) => {
		setError(
			'Unable to find your location. Please try again or use the search box.'
		);
		setTimeout(setError(''), 3000);
		setGeoLoading(false);
	};

	const getGeolocation = () => {
		setGeoLoading(true);
		if (!navigator.geolocation) {
			setError(
				'Geolocation is not supported by your browser. Please use the search box.'
			);
			setGeoLoading(false);
		}
		navigator.geolocation.getCurrentPosition(coordsWeather, coordsError);
	};

	return (
		<StyledHome>
			{pathDiv === 'daily' && pathId && <DailyDetail pathId={pathId} />}
			{pathDiv === 'hourly' && pathId && <HourlyDetail pathId={pathId} />}

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
					{apiError && (
						<StyledError>
							<h4>{apiError}</h4>
						</StyledError>
					)}
					{geoLoading || isLoading ? <Loader /> : null}

					{weather && !isLoading && (
						<>
							<Current city={city} />
							<Daily />
							<Hourly />
							<Minutely />
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
`;

const Banner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 3rem;

	h1 {
		font-family: 'Playball', sans-serif;
		font-style: italic;
		margin-bottom: 1rem;
	}

	h4 {
		font-family: 'SourceSansPro SemiBold';
	}
`;

const Menu = styled.div`
	width: 90%;
	margin: 0 auto 3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);
	animation: ${fadeIn} 0.6s ease-in 0s 1 normal forwards running;

	p {
		font-weight: 400;
	}
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
			font-size: 0.75rem;
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
	background: hsl(0, 0%, 50%, 0.1);
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
