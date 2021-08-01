import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Search, MapPin } from 'react-feather';

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

const Home = () => {
	const [city, setCity] = useState('');
	const [geoLoading, setGeoLoading] = useState(false);
	const [error, setError] = useState('');
	const isLoading = useSelector((state) => state.isLoading);
	const weather = useSelector((state) => state.weather);

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
					<div className='logo__section'>
						<h1>Ciela</h1>
						<h4>{today}</h4>
					</div>

					<div className='search__section'>
						<div className='geolocation' onClick={getGeolocation}>
							<MapPin color='#fff' />
							<h4>Use my current location</h4>
						</div>
						<h6>OR</h6>
						<div className='search__form'>
							<SearchInput>
								<form onSubmit={weatherHandler}>
									<Search color='#999' size={18} />
									<input
										name='city'
										type='text'
										placeholder='Enter city and country'
										value={city}
										onChange={cityHandler}
									/>
									<button
										onClick={weatherHandler}
										onTouchStart={weatherHandler}
										type='submit'
									>
										Get Weather
									</button>
								</form>
							</SearchInput>
							<p>
								For best results, enter your postcode, city and country: e.g. N1
								London UK.
							</p>
						</div>
					</div>
				</Banner>

				<Results>
					{error && <h3>{error}</h3>}
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
	margin-bottom: 2rem;

	.logo__section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h1 {
			font-family: 'Playball', sans-serif;
			font-style: italic;
			margin-bottom: 1rem;
		}

		h4 {
			font-weight: 600;
			font-style: italic;
		}
	}

	.search__section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		margin-top: 5vh;
		padding: 2rem;
		background: hsl(0, 0%, 50%, 0.1);
		box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 10px;
		border: 2px solid hsl(0, 0%, 100%, 0.2);

		h6 {
			margin: 1rem 0rem;
		}

		p {
			font-size: 12px;
		}

		.geolocation {
			display: flex;
			margin-left: 0.5rem;
			z-index: 2;
			cursor: pointer;

			h4 {
				margin-left: 0.5rem;
			}
		}
	}

	@media (max-width: 768px) {
		margin-bottom: 0rem;

		.search__section {
			margin: 2rem auto;
			padding: 1rem;
		}
	}
`;

const SearchInput = styled.div`
	margin-bottom: 0.5rem;

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem;
		border-radius: 2rem;
		background: hsl(208, 21%, 88%);
	}

	input {
		background: transparent;
		margin-left: 0.5rem;
		min-width: 20rem;
		max-width: 30rem;
		border: none;
		outline: none;
		font-size: 14px;
		font-weight: 500;
		text-align: center;
		text-transform: capitalize;

		input:focus {
			background: none;
		}
	}

	button {
		display: none;
	}

	@media (max-width: 500px) {
		form {
			padding: 0.5rem;
		}

		input {
			min-width: 10rem;
			font-size: 0.8rem;
		}
	}
`;

const Results = styled.div`
	min-height: 50vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export default Home;
