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
							<h2>{city ? city : address}</h2>
						</div>

						<div className='current__main'>
							<div className='current__left'>
								<div className='current__desc'>
									<h2>{current.weather[0].description}</h2>
								</div>

								<div className='current__weather'>
									<h2>
										<span>{Math.round(current.temp)}</span>&#176;C
									</h2>
									<img
										src={convertIcon(current.weather[0].icon)}
										alt={current.weather[0].main}
									/>
								</div>

								<div className='current__info'>
									<div className='feels__like'>
										<p>Feels like </p>
										<h4>{Math.round(current.feels_like)}&#176;C</h4>
									</div>

									<div className='high__low'>
										<p>High: </p>
										<h4>{Math.round(daily[0].temp.max)}&#176;C</h4>
										<p>Low: </p>
										<h4>{Math.round(daily[0].temp.min)}&#176;C</h4>
									</div>
								</div>
							</div>

							<div className='current__right'>
								<div className='current__extra'>
									<div className='sunrise'>
										<Sunrise />
										<p>{formatTime(current.sunrise, timezoneOffset)}</p>
									</div>
									<div className='sunset'>
										<Sunset />
										<p>{formatTime(current.sunset, timezoneOffset)}</p>
									</div>

									<div className='uvIndex'>
										<Sun />
										<p>UV Index: {current.uvi}</p>
									</div>
									<div className='cloud'>
										<Cloud />
										<p>{current.clouds}% cloudy</p>
									</div>

									<div className='wind'>
										<div className='wind__main'>
											<Wind />
											<p>
												{Math.round(current.wind_speed * 2.237).toFixed(0)} mph
											</p>
										</div>
										<div className='wind__dir'>
											<p>{convertWindDirection(current.wind_deg)} wind</p>
										</div>
									</div>
									<div className='por'>
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
	width: 90%;
	margin: 0 auto;
	background: hsl(0, 0%, 100%, 0.1);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 2px solid hsl(0, 0%, 100%, 0.2);

	.current__city {
		margin-bottom: 2rem;
		text-transform: capitalize;
	}

	.current__main {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}

	h4,
	p {
		font-size: 1.2rem;
	}

	.current__left {
		display: flex;
		flex-direction: column;
		align-items: space-between;
	}

	.current__weather {
		display: flex;
		align-items: center;

		h2 {
			font-size: 6rem;
			font-weight: 600;
			margin-right: 2rem;
		}

		img {
			height: 20rem;
			width: 20rem;
		}
	}

	.current__desc h2 {
		text-transform: capitalize;
		font-weight: 500;
		font-size: 28px;
	}

	.current__info {
		display: flex;
		flex-direction: column;
		justify-content: center;

		h4,
		p {
			margin-right: 0.5rem;
		}

		.feels__like,
		.high__low,
		.description {
			margin-bottom: 1rem;
			display: flex;
		}
	}

	.current__right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin-left: 6rem;
	}

	.current__extra {
		display: flex;
		flex-wrap: wrap;

		& > * {
			flex: 1 1 192px;
		}

		svg,
		p {
			margin-right: 0.75rem;
		}

		.sunrise,
		.sunset,
		.wind,
		.uvIndex,
		.cloud,
		.por,
		.humidity,
		.visibility {
			display: flex;
			height: 72px;
			margin-top: 1rem;
		}

		.wind {
			flex-direction: column;
		}

		.wind__main {
			display: flex;
		}
	}

	@media (max-width: 1400px) {
		width: 100%;

		.current__main {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.current__right {
			margin-left: 0;
			padding: 1rem;
		}

		.current__extra {
			& > * {
				flex: 1 1 160px;
			}
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;

		h2 {
			font-size: 1.5rem;
		}

		h4,
		p {
			font-size: 1rem;
		}

		.current__weather {
			h2 {
				font-size: 4rem;
			}

			img {
				height: 8rem;
				width: 8rem;
			}
		}

		.current__extra {
			& > * {
				flex: 1 1 128px;
			}
		}
	}

	@media (max-width: 500px) {
		h2 {
			font-size: 1.2rem;
		}

		h4,
		p {
			font-size: 0.9rem;
		}

		.current__weather {
			h2 {
				font-size: 3rem;
			}

			img {
				height: 6rem;
				width: 6rem;
			}
		}

		.current__extra {
			& > * {
				flex: 1 1 96px;
			}
		}
	}
`;

export default Current;
