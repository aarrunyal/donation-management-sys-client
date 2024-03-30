import { useSelector } from 'react-redux';

export default class AccessControlService {
	user = useSelector((state) => state.user);

	permission = useSelector((state) => state.permission);

	allowAccess(accessTo = [], accessType = null) {
		if (
			accessTo.length <= 0 ||
			!accessType ||
			!this.permission ||
			!this.user ||
			!this.user.role
		)
			return false;
		if (accessTo.find((acc) => acc === 'all')) return true;
		let permissionList = Object.values(this.permission);
		let role = this.user.role.toLowerCase();
		let permissionNeeded = null;
		if (accessTo.find((acc) => acc === role))
			permissionNeeded = `${role.toLowerCase()}_${accessType}`;
		if (permissionList.find((per) => per === permissionNeeded)) return true;
		return false;
	}
}
