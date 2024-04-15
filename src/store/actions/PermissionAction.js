import * as actionTypes from './ActionType';

export const createPermission = (permission) => {
	return {
		type: actionTypes.CREATE_PERMISSION,
		permission: permission,
	};
};

export const removePermission = () => {
	return {
		type: actionTypes.REMOVE_PERMISSION,
		permission: null,
	};
};
