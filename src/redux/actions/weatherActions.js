import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getCoordsWeather = (lat, lon) => async (dispatch) => {
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
};

export const getCityWeather = (city) => async (dispatch) => {
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
};
