import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getCoordsWeather = (lat, lon) => async (dispatch) => {
	try {
		dispatch({
			type: 'LOADING_WEATHER',
		});

		const response = await axios.post(
			'/.netlify/functions/coords',
			JSON.stringify({ lat, lon }),
			config
		);

		console.log(response.data);

		dispatch({
			type: 'COORDS_WEATHER',
			payload: {
				weather: response.data.weather,
			},
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: 'COORDS_WEATHER_FAIL',
			payload: message,
		});
	}
};

export const getCityWeather = (city) => async (dispatch) => {
	try {
		dispatch({
			type: 'LOADING_WEATHER',
		});

		const response = await axios.post(
			'/.netlify/functions/city',
			JSON.stringify({ city }),
			config
		);

		console.log(response.data);

		dispatch({
			type: 'CITY_WEATHER',
			payload: {
				weather: response.data.weather,
			},
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: 'CITY_WEATHER_FAIL',
			payload: message,
		});
	}
};
