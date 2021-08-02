import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled from 'styled-components';
import { Wind, Umbrella } from 'react-feather';

const Daily = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { daily, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && daily && (
				<StyledDaily>
					<div className='daily__title'>
						<h2>Week Ahead</h2>
					</div>

					<DailyContainer>
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
													<p>
														{Math.round(dp.wind_speed * 2.237).toFixed(0)} mph
													</p>
												</div>
												<div className='daily__por'>
													<Umbrella />
													<p>{(dp.pop * 100).toFixed(0)}%</p>
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
					</DailyContainer>
				</StyledDaily>
			)}
		</>
	);
};

const StyledDaily = styled.div`
	margin-bottom: 2rem;

	.daily__title {
		margin-bottom: 1rem;
	}
`;

const DailyContainer = styled.div`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 1rem 2rem;

	::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: 500px) {
		::-webkit-scrollbar {
			display: auto;
		}
	}
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
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 8px 16px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 2px solid hsl(0, 0%, 100%, 0.2);

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
		p {
			margin-right: 0.5rem;
		}
	}

	.daily__main {
		display: flex;
		flex-direction: column;

		h4 {
			font-size: 1.4rem;
			margin-bottom: 0.75rem;
		}

		p {
			text-transform: capitalize;
			padding-top: 0.5rem;
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
	}

	.daily__por {
		display: flex;
	}

	.daily__temp {
		text-align: right;

		h3 {
			margin-bottom: 0.5rem;
		}

		h4 {
			font-size: 1.4rem;
		}
	}
`;

export default Daily;
