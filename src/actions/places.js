import { ADD_PLACE, DELETE_PLACE } from '../utils/constants';

export const addPlace = placeName => dispatch => {
	dispatch({
		type: ADD_PLACE,
		placeName: placeName
	});
};

export const deletePlace = key => dispatch => {
	dispatch({
		type: DELETE_PLACE,
		data: key
	});
};
