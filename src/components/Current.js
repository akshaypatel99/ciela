import { useSelector } from 'react-redux';
import { formatTime } from '../utils/convertUnixTime';
import styled from 'styled-components';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import { Sunrise, Sunset, Wind, Umbrella, Sun, Cloud } from 'react-feather';

const Current = ({ city }) => {
	const isLoading = useSelector((state) => state.isLoading);
	const { current, daily, address, timezoneOffset } = useSelector(
		(state) => state.weather
	);

	return (
		<>
			{!isLoading && current && (
				<StyledCurrent>
					<div className='currently__title'>
						<h2>Currently</h2>
					</div>

					<CurrentContainer>
						<div className='current__city'>
							<h3>{city ? city : address}</h3>
						</div>

						<div className='current__main'>
							<div className='current__top'>
								<div className='current__desc'>
									<h3>{current.weather[0].description}</h3>
								</div>

								<div className='current__weather'>
									<h1>
										<span>{Math.round(current.temp)}</span>&#176;C
									</h1>
									<img
										src={convertIcon(current.weather[0].icon)}
										alt={current.weather[0].main}
									/>
								</div>

								<div className='current__info'>
									<div className='current__info__temps'>
										<p>Feels like: </p>
										<h6>{Math.round(current.feels_like)}&#176;C</h6>
									</div>
									<div className='current__info__temps'>
										<p>High: </p>
										<h6>{Math.round(daily[0].temp.max)}&#176;C</h6>
									</div>
									<div className='current__info__temps'>
										<p>Low: </p>
										<h6>{Math.round(daily[0].temp.min)}&#176;C</h6>
									</div>
								</div>
							</div>

							<div className='current__bottom'>
								<div className='current__extra'>
									<div className='current__extra__icons'>
										<Sunrise />
										<p>{formatTime(current.sunrise, timezoneOffset)}</p>
									</div>
									<div className='current__extra__icons'>
										<Sunset />
										<p>{formatTime(current.sunset, timezoneOffset)}</p>
									</div>

									<div className='current__extra__icons'>
										<Sun />
										<p>UV Index: {current.uvi}</p>
									</div>
									<div className='current__extra__icons'>
										<Cloud />
										<p>{current.clouds}% cloudy</p>
									</div>

									<div className='current__extra__icons'>
										<Wind />
										<p className='wind'>
											{Math.round(current.wind_speed * 2.237).toFixed(0)} mph{' '}
											{convertWindDirection(current.wind_deg)} wind
										</p>
									</div>
									<div className='current__extra__icons'>
										<Umbrella />
										<p>{(daily[0].pop * 100).toFixed(0)}% chance of rain</p>
									</div>
								</div>
							</div>
						</div>
					</CurrentContainer>
				</StyledCurrent>
			)}
		</>
	);
};

const StyledCurrent = styled.div`
	margin: 2rem 0rem 4rem;

	.currently__title {
		margin-bottom: 1rem;
	}
`;

const CurrentContainer = styled.div`
	padding: 2rem;
	min-height: 10rem;
	width: 100%;
	margin: 0 auto;
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 2px solid hsl(0, 0%, 100%, 0.2);

	.current__city {
		margin-bottom: 1.5rem;
		text-transform: capitalize;

		h3 {
			font-weight: 400;
		}
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

		h4 {
			font-weight: 600;
			margin-right: 2rem;
		}

		img {
			height: 6rem;
			width: 6rem;
		}
	}

	.current__desc h3 {
		text-transform: capitalize;
		font-weight: 600;
	}

	.current__info {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		h4,
		p {
			margin-right: 0.5rem;
		}

		&__temps {
			margin-bottom: 1rem;
			display: flex;
			white-space: no-wrap;
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
		p {
			margin-right: 0.75rem;
		}

		&__icons {
			display: flex;
			height: 56px;
			margin-top: 1rem;
		}
	}
`;

export default Current;
