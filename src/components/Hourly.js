import { Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled from 'styled-components';
import { slideInRight } from '../styles/GlobalStyle';
import useWeather from '../utils/useWeather';
import Error from './Error';

const Hourly = ({ method }) => {
	const { data, status, error } = useWeather(method);
	const { hourly, timezoneOffset } = data || {};
	const isLoading = status === 'loading';
	const isError = status === 'error';

	return (
		<>
			<StyledHourly>
				<div className='hourly__title'>
					<h2>Next 48 Hours</h2>
				</div>

				<HourlyContainer>
					{isLoading ? (
						<h4>Loading...</h4>
					) : isError ? (
						<Error error={error} />
					) : (
						<>
							{hourly &&
								hourly.map((dp) => (
									<HourlySummary
										key={dp.dt}
										newDay={
											formatTime(dp.dt, timezoneOffset) === '00:00'
												? '1px solid #fecb00'
												: '1px solid hsl(0, 0%, 100%, 0.2)'
										}
									>
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
						</>
					)}
				</HourlyContainer>
			</StyledHourly>
		</>
	);
};

const StyledHourly = styled.div`
	margin-bottom: 3rem;
	animation: ${slideInRight} 0.6s ease-in 0s 1 normal forwards running;

	.hourly__title {
		margin-bottom: 0.5rem;

		h2 {
			font-weight: 700;
		}
	}
`;

const HourlyContainer = styled.div`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 1rem 2rem;
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
	background: hsl(0, 0%, 100%, 0.2);
	box-shadow: 0 5px 10px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);
	border: ${(props) => props.newDay};

	a {
		text-decoration: none;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	h5 {
		font-weight: 400;
	}
`;

export default Hourly;
