import * as actionTypes from './ActionType';

export const createUser = (user) => {
	return {
		type: actionTypes.CREATE_USER,
		user: user,
	};
};

export const removeUser = () => {
	return {
		type: actionTypes.REMOVE_USER,
		user: null,
	};
};
