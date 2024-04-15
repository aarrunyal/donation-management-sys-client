import axios from "axios";
import { HttpUrlConfigService } from "./HttpUrlConfigService";

export default class RoleService extends HttpUrlConfigService {
	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}` + 'admin/role';
	}

	async getPermissionsByRole() {
		let url = `${this.apiUrl}/permissions`;
		return await axios.get(url, this.header);
	}
}
