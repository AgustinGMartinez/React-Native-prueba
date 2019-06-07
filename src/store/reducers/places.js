import { ADD_PLACE, DELETE_PLACE } from '../../utils/constants';

const initialState = {
	places: [
		{
			key: 'a' + Math.random(),
			name: 'ejemplo',
			image: {
				uri:
					'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg',
			},
		},
		{
			key: 'a' + Math.random(),
			name: 'ejemplo',
			image: {
				uri:
					'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg',
			},
		},
		{
			key: 'a' + Math.random(),
			name: 'ejemplo',
			image: {
				uri:
					'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg',
			},
		},
		{
			key: 'a' + Math.random(),
			name: 'ejemplo',
			image: {
				uri:
					'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg',
			},
		},
		{
			key: 'a' + Math.random(),
			name: 'ejemplo',
			image: {
				uri:
					'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg',
			},
		},
	],
	selectedPlace: null,
};

const reducer = (state = initialState, action) => {
	const newState = { ...state, places: [...state.places] };
	switch (action.type) {
		case ADD_PLACE:
			newState.places.push({
				key: 'a' + Math.random(),
				name: action.placeName,
				image: {
					uri:
						'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg',
				},
			});
			return newState;
		case DELETE_PLACE:
			newState.places = newState.places.filter(
				place => place.key !== action.data
			);
			return newState;
		default:
			return newState;
	}
};

export default reducer;
