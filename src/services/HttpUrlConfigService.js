export class HttpUrlConfigService {
	constructor() {
		this.apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API_SUFFIX}/`;
		if (localStorage.getItem('token') != null) {
			this.header = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			};
		}
	}
}
