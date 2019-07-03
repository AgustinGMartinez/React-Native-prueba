import { ADD_PLACE, DELETE_PLACE, SAVE_LOCATION } from '../utils/constants';

const saveLocation = coords => dispatch => {
	dispatch({
		type: SAVE_LOCATION,
		data: coords,
	});
};

const addPlace = placeName => dispatch => {
	dispatch({
		type: ADD_PLACE,
		placeName: placeName,
	});
};

const deletePlace = key => dispatch => {
	dispatch({
		type: DELETE_PLACE,
		data: key,
	});
};

export default {
	saveLocation,
	addPlace,
	deletePlace,
};
