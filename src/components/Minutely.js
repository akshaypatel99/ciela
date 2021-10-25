import { useSelector } from 'react-redux';
import { rainfall, rainfallKey } from '../utils/rainfall';
import styled from 'styled-components';
import { slideInBottom } from '../styles/GlobalStyle';
import { formatTime } from '../utils/convertUnixTime';

const Hourly = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { minutely, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && minutely && (
				<StyledMinutely>
					<div className='minutely__title'>
						<h2>Rainfall Next Hour</h2>
					</div>

					<MinutelyContainer>
						<TopScale>
							<div className='increments'>
								<h6>Now</h6>
							</div>
							<div className='increments'>
								<h6>15</h6>
							</div>
							<div className='increments'>
								<h6>30</h6>
							</div>
							<div className='increments'>
								<h6>45</h6>
							</div>
							<div className='increments'>
								<h6>60</h6>
							</div>
						</TopScale>
						<Chart>
							{minutely &&
								minutely.map((dp, index) => {
									if (dp.precipitation > 0) {
										return (
											<MinutelyDataPoint
												key={dp.dt}
												style={{
													background: `${rainfall(dp.precipitation)}`,
													borderTop: '1px solid hsl(208, 12%, 58%)',
													borderBottom: '1px solid hsl(208, 12%, 58%)',
												}}
											></MinutelyDataPoint>
										);
									} else {
										return (
											<MinutelyDataPoint
												key={dp.dt}
												style={{
													background: 'hsl(190, 90%, 92%)',
													borderTop: '1px solid hsl(208, 12%, 58%)',
													borderBottom: '1px solid hsl(208, 12%, 58%)',
												}}
											></MinutelyDataPoint>
										);
									}
								})}
						</Chart>
						<BottomScale>
							<div className='increments'>
								<h6>{formatTime(minutely[0].dt, timezoneOffset)}</h6>
							</div>
							<div className='increments'>
								<h6>{formatTime(minutely[15].dt, timezoneOffset)}</h6>
							</div>
							<div className='increments'>
								<h6>{formatTime(minutely[30].dt, timezoneOffset)}</h6>
							</div>
							<div className='increments'>
								<h6>{formatTime(minutely[45].dt, timezoneOffset)}</h6>
							</div>
							<div className='increments'>
								<h6>{formatTime(minutely[60].dt, timezoneOffset)}</h6>
							</div>
						</BottomScale>
						<Key>
							<div className='key__title'>
								<h4>Key</h4>
								<p>Rainfall in mm/hr</p>
							</div>

							<KeyContainer>
								{rainfallKey.map((el) => (
									<KeySquare key={el.color}>
										<div
											className='color'
											style={{
												background: `${el.color}`,
											}}
										></div>
										<div className='amount'>
											<p>{el.amount}</p>
										</div>
										<div className='description'>
											<p>{el.description}</p>
										</div>
									</KeySquare>
								))}
							</KeyContainer>
						</Key>
					</MinutelyContainer>
				</StyledMinutely>
			)}
		</>
	);
};

const StyledMinutely = styled.div`
	margin-bottom: 2rem;
	animation: ${slideInBottom} 0.6s ease-in 0s 1 normal forwards running;

	.minutely__title {
		margin-bottom: 1rem;
	}
`;

const MinutelyContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.5rem;
	margin: 0 auto;
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 8px 16px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);

	::-webkit-scrollbar {
		display: none;
	}
`;

const MinutelyDataPoint = styled.div`
	width: 100%;
	min-height: 50px;
	min-width: 4px;
`;

const TopScale = styled.div`
	display: flex;
	justify-content: space-between;
`;

const BottomScale = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Chart = styled.div`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	margin: 0.25rem 0;
`;

const Key = styled.div`
	margin-top: 2rem;

	.key__title,
	h4 {
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}
`;
const KeyContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
`;
const KeySquare = styled.div`
	.color {
		min-height: 20px;
		min-width: 40px;
		margin-bottom: 0.25rem;
	}

	.description {
		margin-bottom: 0.5rem;

		p {
			font-size: 0.8rem;
			text-transform: uppercase;
		}
	}
`;

export default Hourly;
