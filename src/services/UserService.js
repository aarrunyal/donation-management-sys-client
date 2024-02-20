import axios from 'axios';
import { HttpUrlConfigService } from './HttpUrlConfigService';

export class UserService extends HttpUrlConfigService {
	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}user`;
	}

	async all() {
		return await axios.get(this.apiUrl);
	}

	async get(id) {
		let url = `${this.apiUrl}/authenticate`;
	}

	async create(data) {
		let url = `${this.apiUrl}/authenticate`;
	}

	async update(id, data) {
		let url = `${this.apiUrl}/authenticate`;
	}

	async delete(id) {
		let url = `${this.apiUrl}/authenticate`;
	}
}
