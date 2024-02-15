export class Config {

    constructor() {
        this.apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API_SUFFIX}/`
        if (localStorage.getItem("token") != null) {
            this.header = {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
}