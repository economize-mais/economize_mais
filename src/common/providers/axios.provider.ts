import { Injectable } from "@nestjs/common"
import axios from "axios"

import * as https from "https"

@Injectable()
export class AxiosProvider {

    private createAgent(): https.Agent {
        return new https.Agent({
            rejectUnauthorized: false
        })
    } 

    createApi(url: string) {
        return axios.create({
            baseURL: url,
            withCredentials: true,
            httpsAgent: this.createAgent(),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}