import { TRY_AUTH } from '../utils/constants';

export function tryAuth(authData) {
	console.log('got', authData);
	return {
		type: TRY_AUTH,
		data: authData,
	};
}
