import axios from 'axios';
import { HttpUrlConfigService } from './HttpUrlConfigService';

export class UserService extends HttpUrlConfigService {
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
		let url = `${this.apiUrl}`;
	}

	async update(id, data) {
		let url = `${this.apiUrl}`;
	}

	async delete(id) {
		let url = `${this.apiUrl}`;
	}
}
