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
			};
		case 'COORDS_WEATHER':
			return {
				...state,
				weather: action.payload.weather,
				isLoading: false,
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
