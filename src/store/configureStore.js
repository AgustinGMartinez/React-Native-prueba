import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import sharePlace from './reducers/sharePlaceReducer';

const reducers = combineReducers({ sharePlace });

const composeEnhancers = __DEV__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	: false || compose;

const configureStore = () => {
	return createStore(
		reducers,
		composeEnhancers(applyMiddleware(ReduxThunk, logger))
	);
};

export default configureStore;
