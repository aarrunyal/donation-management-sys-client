import { HttpUrlConfigService } from './HttpUrlConfigService';

export class UserService extends HttpUrlConfigService {
	constructor() {
		super();
		this.apiUrl = `${this.apiUrl}auth`;
	}
}
