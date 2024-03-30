import * as actionTypes from '../actions/ActionType';

export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.CREATE_PERMISSION:
			return Object.assign({}, action.permission);
		case actionTypes.REMOVE_PERMISSION:
			return (state = {});
		default:
			return state;
	}
};
