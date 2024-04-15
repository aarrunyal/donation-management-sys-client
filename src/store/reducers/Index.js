
import { combineReducers } from 'redux';
import UserReducer from "./UserReducer";
import PermissionReducer from './PermissionReducer';

export default combineReducers({
	user: UserReducer,
	permission: PermissionReducer
});
