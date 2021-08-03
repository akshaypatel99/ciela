import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import {
	Wind,
	Sun,
	Eye,
	Thermometer,
	Umbrella,
	Cloud,
	Droplet,
	LifeBuoy,
	ChevronsLeft,
	ChevronsRight,
	X,
} from 'react-feather';

const HourlyDetail = ({ pathId }) => {
	const isLoading = useSelector((state) => state.isLoading);
	const { hourly, timezoneOffset } = useSelector((state) => state.weather);
	const detail = hourly.filter(
		(hour) => hour.dt.toString() === pathId.toString()
	)[0];
	const index = hourly.findIndex(
		(hour) => hour.dt.toString() === pathId.toString()
	);
	const history = useHistory();

	// Exit Detail
	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			document.body.style.overflow = 'auto';
			history.push('/');
		}
	};

	return (
		<>
			{!isLoading && detail && (
				<CardShadow className='shadow' onClick={exitDetailHandler}>
					<HourDetail>
						<div className='hourlydtl__title'>
							<h2>{formatTime(detail.dt, timezoneOffset)}</h2>
						</div>

						<div className='hourlydtl__close'>
							<X onClick={() => history.push('/')} />
						</div>

						<div className='hourlydtl'>
							<div className='hourlydtl__top'>
								<div className='hourlydtl__top__desc'>
									<h4>{detail.weather[0].description}</h4>
								</div>

								<div className='hourlydtl__top__weather'>
									<img
										src={convertIcon(detail.weather[0].icon)}
										alt={detail.weather[0].main}
									/>
									<h2>{Math.round(detail.temp)}&#176;C</h2>
								</div>
							</div>
							<div className='hourlydtl__bottom'>
								<div className='hourlydtl__bottom__info'>
									<div className='hourlydtl__bottom__info__icons'>
										<Thermometer />
										<p>Feels like: {detail.feels_like.toFixed(0)}&#176;C</p>
									</div>
									<div className='hourlydtl__bottom__info__icons'>
										<Cloud />
										<p>{detail.clouds}% cloudy</p>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<Umbrella />
										<p>{(detail.pop * 100).toFixed(0)}% chance of rain</p>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<Sun />
										<p>UV Index: {detail.uvi}</p>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<Droplet />
										<p>{detail.humidity}% humidity</p>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<LifeBuoy />
										<p>Pressure: {detail.pressure} hPa</p>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<Eye />
										<p>Visibility: {detail.visibility} metres</p>
									</div>

									<div className='hourlydtl__bottom__info__icons'>
										<Wind />
										<p>
											{Math.round(detail.wind_speed * 2.237).toFixed(0)} mph{' '}
											{convertWindDirection(detail.wind_deg)} wind
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='hourlydtl__nav__prev'>
							{index > 0 && (
								<Link to={`/hourly/${detail.dt - 3600}`}>
									<ChevronsLeft />
								</Link>
							)}
						</div>
						<div className='hourlydtl__nav__next'>
							{index < 47 && (
								<Link to={`/hourly/${detail.dt + 3600}`}>
									<ChevronsRight />
								</Link>
							)}
						</div>
					</HourDetail>
				</CardShadow>
			)}
		</>
	);
};

const CardShadow = styled.div`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: hsl(190, 20%, 30%, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	::-webkit-scrollbar {
		display: none;
	}
`;

const HourDetail = styled.div`
	width: 90%;
	min-height: 640px;
	padding: 1.5rem;
	position: absolute;
	margin: auto;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	z-index: 10;
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(25px);
	-webkit-backdrop-filter: blur(25px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);

	.hourlydtl__title {
		h2 {
			font-family: 'Metropolis SemiBold';
		}
	}

	.hourlydtl__close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
	}

	.hourlydtl {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-top: 2rem;
	}

	.hourlydtl__top {
		width: 100%;
		min-height: 170px;
		display: flex;
		flex-direction: column;

		&__desc {
			width: 100%;

			h4 {
				text-transform: capitalize;
				font-family: 'Metropolis Medium';
				text-align: center;
			}
		}

		&__weather {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			margin: 0 auto;

			img {
				height: 8rem;
				width: 8rem;
			}

			h2 {
				font-size: 3.5rem;
				font-family: 'Metropolis SemiBold';
			}
		}
	}

	.hourlydtl__bottom {
		display: flex;
		margin-bottom: 2rem;

		&__info {
			display: flex;
			flex-wrap: wrap;
			margin-top: 1rem;

			& > * {
				flex: 1 1 104px;
				margin: 0.25rem;
			}

			svg,
			p {
				margin-right: 0.75rem;
			}

			&__icons {
				display: flex;
				height: 48px;
				align-items: center;
			}
		}
	}

	.hourlydtl__nav__prev {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
	}

	.hourlydtl__nav__next {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}

	@media (min-width: 500px) {
		max-width: 460px;

		.hourlydtl__bottom {
			width: 90%;
			margin: 1rem auto;

			&__info__icons {
				height: 64px;
				margin-top: 1rem;

				p {
					font-size: 0.9rem;
				}
			}
		}
	}

	@media (max-height: 700px) {
		.hourlydtl__bottom__info__icons {
			height: 44px;
		}
	}
`;

export default HourlyDetail;
