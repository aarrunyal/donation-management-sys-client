import axios from "axios";

import { Config } from "./ConfigService";
export default class AuthService extends Config{
    

    constructor(){
        super();
        this.apiUrl =  `${this.apiUrl}auth`
    }

    async login(data) {
        let url  =  `${this.apiUrl}/authenticate`
        console.log("url is " +url)
        return await axios.post(url, data)
    }

    register(data) {
        return axios.post(`${this.apiUrl}`, data)

    }
}