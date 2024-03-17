import axios from 'axios';
import { HttpUrlConfigService } from './HttpUrlConfigService';
export default class SiteConfigService extends HttpUrlConfigService {
	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}` + 'admin/site-config';
	}


	stripeClientSecret = ()=>{
		let url = this.apiUrl + "/client-secret"
		this.axios.get(url, this.header);
	}
}
