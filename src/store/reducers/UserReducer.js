import * as actionTypes from '../actions/ActionType';

export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.CREATE_USER:
			return Object.assign({}, action.user);
		case actionTypes.REMOVE_USER:
			return (state = {});
		default:
			return state;
	}
};
