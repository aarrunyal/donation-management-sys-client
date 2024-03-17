import axios from 'axios';
import { HttpUrlConfigService } from './HttpUrlConfigService';
import Helper from './Helper';
export default class DonationPaymentService extends HttpUrlConfigService {

	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}` + 'admin/donation-payment';
		this.helper = new Helper()
	}

	async all(filter = {}) {
		// let queryString = this.helper.generateQueryString(filter);
		let url = this.apiUrl
		return await axios.get(url, this.header);
	}

	async get(id) {
		let url = `${this.apiUrl}/${id}`;
		return await axios.get(url, this.header);
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

	async createPaymentIntent(data) {
		let url = `${this.apiUrl}/create-payment-intent`;
		return await axios.post(url, data, this.header);
	}


}
