import { Link } from 'react-router-dom';
import { formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled from 'styled-components';
import { slideInLeft } from '../styles/GlobalStyle';
import { Wind, Umbrella } from 'react-feather';
import useWeather from '../utils/useWeather';
import Error from './Error';

const Daily = ({ method }) => {
	const { data, status, error } = useWeather(method);
	const { daily, timezoneOffset } = data || {};
	const isLoading = status === 'loading';
	const isError = status === 'error';

	return (
		<>
			<StyledDaily>
				<div className='daily__title'>
					<h2>Week Ahead</h2>
				</div>

				<DailyContainer>
					{isLoading ? (
						<h4>Loading...</h4>
					) : isError ? (
						<Error error={error} />
					) : (
						<>
							{daily &&
								daily.map((dp) => (
									<DailySummary key={dp.dt}>
										<Link to={`/daily/${dp.dt}`}>
											<div className='daily__top'>
												<div className='daily__main'>
													<h4>{formatDayDate(dp.dt, timezoneOffset)}</h4>
													<p>{dp.weather[0].description}</p>
												</div>
												<div className='daily__icon'>
													<img
														src={convertIcon(dp.weather[0].icon)}
														alt={dp.weather[0].main}
													/>
												</div>
											</div>
											<div className='daily__bottom'>
												<div className='daily__small'>
													<div className='daily__wind'>
														<Wind />
														<h6>
															{Math.round(dp.wind_speed * 2.237).toFixed(0)} mph
														</h6>
													</div>
													<div className='daily__por'>
														<Umbrella />
														<h6>{(dp.pop * 100).toFixed(0)}%</h6>
													</div>
												</div>
												<div className='daily__temp'>
													<h3>{Math.round(dp.temp.max)}&#176;C</h3>
													<h4>{Math.round(dp.temp.min)}&#176;C</h4>
												</div>
											</div>
										</Link>
									</DailySummary>
								))}
						</>
					)}
				</DailyContainer>
			</StyledDaily>
		</>
	);
};

const StyledDaily = styled.div`
	margin-bottom: 3rem;
	animation: ${slideInLeft} 0.6s ease-in 0s 1 normal forwards running;

	.daily__title {
		margin-bottom: 0.5rem;

		h2 {
			font-weight: 700;
		}
	}
`;

const DailyContainer = styled.div`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 1rem 2rem;
`;

const DailySummary = styled.div`
	padding: 2rem;
	min-width: 256px;
	min-height: 176px;
	margin-right: 1rem;
	display: flex;
	flex-direction: column;
	transition: all 0.2s ease-out;
	cursor: pointer;
	background: hsl(0, 0%, 100%, 0.2);
	box-shadow: 0 8px 16px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);

	a {
		text-decoration: none;
	}

	.daily__top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.daily__bottom {
		display: flex;
		justify-content: space-between;

		svg,
		h6 {
			margin-right: 0.5rem;
		}
	}

	.daily__main {
		display: flex;
		flex-direction: column;

		h4 {
			font-size: 1.4rem;
			font-weight: 700;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
		}

		p {
			font-weight: 400;
			padding-top: 0.5rem;
			text-transform: uppercase;
		}
	}

	.daily__icon {
		img {
			height: 5rem;
			width: 5rem;
		}
	}

	.daily__small {
		display: flex;
		flex-direction: column;
	}

	.daily__wind {
		display: flex;
		padding-bottom: 1rem;
		align-items: center;
	}

	.daily__por {
		display: flex;
		align-items: center;
	}

	.daily__temp {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;

		h3 {
			margin-bottom: 0.5rem;
			font-weight: 400;
		}

		h4 {
			font-size: 1.4rem;
			font-weight: 400;
		}
	}
`;

export default Daily;
