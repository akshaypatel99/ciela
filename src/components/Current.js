import { useState } from 'react';
import { formatTime } from '../utils/convertUnixTime';
import styled from 'styled-components';
import { fadeIn } from '../styles/GlobalStyle';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import Alert from './Alert';
import Error from './Error';
import {
	Sunrise,
	Sunset,
	Wind,
	Umbrella,
	Sun,
	Cloud,
	AlertTriangle,
} from 'react-feather';
import useWeather from '../utils/useWeather';

const Current = ({ city, method }) => {
	const [showAlert, setShowAlert] = useState(false);
	const { data, status, error } = useWeather(method);
	const { current, daily, address, timezoneOffset, alerts } = data || {};
	const isLoading = status === 'loading';
	const isError = status === 'error';

	return (
		<>
			<StyledCurrent>
				<div className='currently__title'>
					<h2>Currently</h2>
				</div>

				<div
					className='warning'
					aria-label='weather warning'
					tabIndex='4'
					onClick={() => setShowAlert(!showAlert)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							setShowAlert(!showAlert);
						}
					}}
				>
					<AlertTriangle />
				</div>

				{showAlert && <Alert alerts={alerts} timezoneOffset={timezoneOffset} />}

				<CurrentContainer>
					{isLoading ? (
						<h4>Loading...</h4>
					) : isError ? (
						<Error error={error} />
					) : (
						<>
							<div className='current__city'>
								<h4>{city ? city : address}</h4>
							</div>

							<div className='current__main'>
								<div className='current__top'>
									<div className='current__desc'>
										<h3>{current.weather[0].description}</h3>
									</div>

									<div className='current__weather'>
										<img
											src={convertIcon(current.weather[0].icon)}
											alt={current.weather[0].main}
										/>
										<h1>
											<span>{Math.round(current.temp)}</span>&#176;C
										</h1>{' '}
									</div>

									<div className='current__info'>
										<div className='current__info__temps'>
											<h6>Feels like: </h6>{' '}
											<h5>{Math.round(current.feels_like)}&#176;C</h5>
										</div>
										<div className='current__info__temps'>
											<h6>High: </h6>{' '}
											<h5>{Math.round(daily[0].temp.max)}&#176;C</h5>
										</div>
										<div className='current__info__temps'>
											<h6>Low: </h6>{' '}
											<h5>{Math.round(daily[0].temp.min)}&#176;C</h5>
										</div>
									</div>
								</div>

								<div className='current__bottom'>
									<div className='current__extra'>
										<div className='current__extra__icons'>
											<Sunrise />
											<h6>{formatTime(current.sunrise, timezoneOffset)}</h6>
										</div>
										<div className='current__extra__icons'>
											<Sunset />
											<h6>{formatTime(current.sunset, timezoneOffset)}</h6>
										</div>

										<div className='current__extra__icons'>
											<Sun />
											<h6>UV Index: {current.uvi}</h6>
										</div>
										<div className='current__extra__icons'>
											<Cloud />
											<h6>{current.clouds}% cloudy</h6>
										</div>

										<div className='current__extra__icons'>
											<Wind />
											<h6 className='wind'>
												{Math.round(current.wind_speed * 2.237).toFixed(0)} mph{' '}
												{convertWindDirection(current.wind_deg)} wind
											</h6>
										</div>
										<div className='current__extra__icons'>
											<Umbrella />
											<h6>{(daily[0].pop * 100).toFixed(0)}% chance of rain</h6>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</CurrentContainer>
			</StyledCurrent>
		</>
	);
};

const StyledCurrent = styled.div`
	margin-bottom: 4rem;
	position: relative;
	animation: ${fadeIn} 0.6s ease-in 0s 1 normal forwards running;

	.currently__title {
		margin-bottom: 1rem;

		h2 {
			font-weight: 600;
		}
	}

	.warning {
		position: absolute;
		top: 0.4rem;
		right: 0.25rem;
		cursor: pointer;
	}
`;

const CurrentContainer = styled.div`
	padding: 2rem;
	min-height: 10rem;
	width: 100%;
	max-width: 536px;
	margin: 0 auto;
	background: hsl(0, 0%, 100%, 0.1);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);

	.current__city {
		margin-bottom: 2rem;
		text-transform: capitalize;
		text-align: center;
	}

	.current__main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
	}

	.current__top {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.current__weather {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 1rem 0rem;

		h1 {
			font-size: 3.5rem;
			font-weight: 500;

			span {
				font-weight: 600;
			}
		}

		img {
			height: 6rem;
			width: 6rem;
		}
	}

	.current__desc h3 {
		text-transform: uppercase;
		text-align: center;
		font-weight: 600;
	}

	.current__info {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		&__temps {
			margin-bottom: 1rem;
			display: flex;
			white-space: no-wrap;
			align-items: center;
			padding: 0.2rem;

			h5 {
				margin-left: 0.25rem;
			}
		}
	}

	.current__bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.current__extra {
		display: flex;
		flex-wrap: wrap;

		& > * {
			flex: 1 1 96px;
		}

		svg,
		h6 {
			margin-right: 0.75rem;
		}

		&__icons {
			display: flex;
			height: 56px;
			margin-top: 1rem;
			margin-left: 0.5rem;
			align-items: center;
		}
	}

	@media (max-width: 420px) {
		.current__info {
			justify-content: space-around;
			flex-wrap: wrap;

			&__temps {
				margin-bottom: 0.5rem;
			}
		}
	}
`;

export default Current;
