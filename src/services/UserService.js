import axios from 'axios';
import { HttpUrlConfigService } from './HttpUrlConfigService';

export default class UserService extends HttpUrlConfigService {
	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}` + 'admin/user';
	}



	async all() {
		return await axios.get(this.apiUrl, this.header);
	}

	async get(id) {
		let url = `${this.apiUrl}`;
	}

	async create(data) {
		return await axios.post(this.apiUrl, data, this.header);
	}

	async update(id, data) {
		let url = `${this.apiUrl}/${id}`;
		return await axios.put(url, data, this.header);
	}

	async delete(id) {
		let url = `${this.apiUrl}/${id}`;
		return await axios.delete(url, this.header);
	}

	async createOrUpdate(data) {
		let url = `${this.apiUrl}/user-details/create-or-update`;
		return await axios.post(url, data, this.header);
	}
}
