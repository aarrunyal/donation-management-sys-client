import axios from "axios";

import { Config } from "./ConfigService";
export default class AuthService extends Config{
    

    constructor(){
        super();
        this.apiUrl =  `${this.apiUrl}auth`
    }

    async login(data) {
        let url  =  `${this.apiUrl}/authenticate`
        return await axios.post(url, data)
    }

    async logout(data){
        let url  =  `${this.apiUrl}/logout`
        return await axios.get(url)
    }

   async register(data) {
        let url  =  `${this.apiUrl}/register`
        return await axios.post(url, data)

    }
}