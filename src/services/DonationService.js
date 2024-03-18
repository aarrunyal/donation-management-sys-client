import axios from 'axios';
import { HttpUrlConfigService } from './HttpUrlConfigService';
import Helper from './Helper';
export default class DonationService extends HttpUrlConfigService {

	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}` + 'admin/donation';
		this.helper = new Helper()
	}

	async all(filter = {}) {
		let queryString = this.helper.generateQueryString(filter);
		let url = this.apiUrl
		// console.log(queryString)
		// if(queryString){
		// 	url = url + "?"+ queryString
		// }
		return await axios.get(url, this.header);
	}

	async get(id) {
		let url = `${this.apiUrl}/${id}`;
		return await axios.get(url, this.header);
	}

	async create(data) {
		return await axios.post(this.apiUrl, data, this.header);
	}

	async uploadImage(id, data) {
		let url = `${this.apiUrl}/${id}/upload`;
		return await axios.post(url, data, this.header);
	}

	async update(id, data) {
		let url = `${this.apiUrl}/${id}`;
		return await axios.put(url, data, this.header);
	}

	async delete(id) {
		let url = `${this.apiUrl}/${id}`;
		return await axios.delete(url, this.header);
	}


	async toggleStatus(id, flag) {
		let url = `${this.apiUrl}/${id}/${flag}`;
		return await axios.get(url, this.header);
	}

	async getOtherCampaignRandomly(id, size) {
		let url = `${this.apiUrl}/${id}/randomly/${size}`;
		return await axios.get(url, this.header);
	}
}
