import axios from 'axios';

import { HttpUrlConfigService } from './HttpUrlConfigService';

export default class AuthService extends HttpUrlConfigService {
	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}auth`;
	}

	async login(data) {
		let url = `${this.apiUrl}/authenticate`;
		return await axios.post(url, data);
	}

	async logout() {
		let url = `${this.apiUrl}/logout`;
		return await axios.get(url);
	}

	async register(data) {
		let url = `${this.apiUrl}/register`;
		return await axios.post(url, data);
	}

	async getLoggedInUser() {
		let url = `${this.apiUrl}/user`;
		let newHeader = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};
		return await axios.get(url, newHeader);
	}
}
