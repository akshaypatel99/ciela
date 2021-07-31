import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled, { css } from 'styled-components';

const Hourly = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { hourly, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && hourly && (
				<StyledHourly>
					<div className='hourly__title'>
						<h2>Next 48 Hours</h2>
					</div>

					<HourlyContainer>
						{hourly &&
							hourly.map((dp) => (
								<HourlySummary key={dp.dt}>
									<Link to={`/hourly/${dp.dt}`}>
										<h5>{formatTime(dp.dt, timezoneOffset)}</h5>
										<img
											src={convertIcon(dp.weather[0].icon)}
											alt={dp.weather[0].main}
										/>
										<h5>{Math.round(dp.temp)}&#176;C</h5>
									</Link>
								</HourlySummary>
							))}
					</HourlyContainer>
				</StyledHourly>
			)}
		</>
	);
};

const StyledHourly = styled.div`
	margin-bottom: 2rem;

	.hourly__title {
		margin-bottom: 1rem;
	}
`;

const HourlyContainer = styled.div`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 1rem 2rem;

	@media (max-width: 500px) {
		::-webkit-scrollbar {
			display: none;
		}
	}
`;

const HourlySummary = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	object-fit: contain;
	width: 112px;
	height: 144px;
	margin-right: 10px;
	transition: transform 0.2s ease-out;
	cursor: pointer;
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 5px 10px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 2px solid hsl(0, 0%, 100%, 0.2);

	a {
		text-decoration: none;
	}

	/* Give yellow border on HourlySummary that reads 00:00 / 86400 seconds in a day */
	${(props) => {
		props.key % 86400 === 0 &&
			css`
				border: 2px solid hsl(39, 91%, 74%);
			`;
	}}
`;

export default Hourly;
