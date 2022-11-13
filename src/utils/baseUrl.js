import axios from "axios";
import { getStringLocal } from "./config";
import { DOMAIN_BE, USER_LOGIN } from "./constant";

export const http = axios.create({
    baseURL: DOMAIN_BE,
    timeout: 6000
})
http.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbjA5ODA5OEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsImFkbWluMDk4MDk4QGdtYWlsLmNvbSIsIkdQMDAiXSwibmJmIjoxNjY4MjQxNDAyLCJleHAiOjE2NjgyNDUwMDJ9.Oj8N6NgHoRk4r1_Qfgx7mlY3aoHac0SuK1Uhg9AI3xw"
        }
    }
}, err => { console.log(err) })