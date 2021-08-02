import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { formatDayDate } from '../utils/convertUnixTime';

const Alert = () => {
	// const isLoading = useSelector((state) => state.isLoading);
	const { alerts, timezoneOffset } = useSelector((state) => state.weather);

	let message;

	if (Array.isArray(alerts)) {
		message = alerts.map((alert) => (
			<div className='alert__msg' key={alert.start}>
				<div className='alert__msg__dtl'>
					<p>Sender: </p>
					<h6>{alert.sender_name}</h6>
				</div>
				<div className='alert__msg__dtl'>
					<p>Event: </p>
					<h6>{alert.event}</h6>
				</div>
				<div className='alert__msg__dtl'>
					<p>Start: </p>
					<h6>{formatDayDate(alert.start, timezoneOffset)}</h6>
				</div>
				<div className='alert__msg__dtl'>
					<p>End: </p>
					<h6>{formatDayDate(alert.end, timezoneOffset)}</h6>
				</div>
				<div className='alert__msg__dtl'>
					<p>Description: </p>
					<p>{alert.description}</p>
				</div>
			</div>
		));
	} else {
		message = <h5>{alerts}</h5>;
	}

	return <StyledAlert>{message}</StyledAlert>;
};

const StyledAlert = styled.div`
	margin: 2rem auto;
	height: auto;
	display: flex;
	flex-direction: column;
	place-items: center;
	padding: 1rem;
	background: hsl(0, 0%, 50%, 0.1);
	box-shadow: 0 8px 16px hsl(0, 0%, 0%, 0.2);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid hsl(0, 0%, 100%, 0.2);
	opacity: 1;

	.alert__msg {
		display: flex;
		flex-direction: column;

		&__dtl {
			display: flex;

			p {
				margin-right: 1rem;
			}
		}
	}
`;

export default Alert;
