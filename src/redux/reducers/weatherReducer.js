const initialState = {
	weather: {},
	isLoading: false,
	error: null,
};

const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOADING_WEATHER':
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case 'COORDS_WEATHER':
			return {
				...state,
				weather: action.payload.weather,
				isLoading: false,
				error: null,
			};
		case 'COORDS_WEATHER_FAIL':
			return {
				...state,
				weather: null,
				isLoading: false,
				error: action.payload,
			};
		case 'CITY_WEATHER':
			return {
				...state,
				weather: action.payload.weather,
				isLoading: false,
				error: null,
			};
		case 'CITY_WEATHER_FAIL':
			return {
				...state,
				weather: null,
				isLoading: false,
				error: action.payload,
			};
		default:
			return { ...state };
	}
};

export default weatherReducer;
