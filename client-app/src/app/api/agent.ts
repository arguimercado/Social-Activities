import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/Activity";

axios.defaults.baseURL = "http://localhost:5000/api";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}


axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string,body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url: string,body: {}) => axios.put<T>(url,body).then(responseBody),
    del:<T> (url: string) => axios.delete<T>(url).then(responseBody),
    
}

const Activities = {
    list: () => request.get<IActivity[]>('/activities'),
    details: (id: string) => request.get(`/activities/${id}`),
    create: (activity : IActivity) => request.post('/activities',activity),
    update: (activity: IActivity) => request.put(`/activities/${activity.id}`,activity)
}

const agent = {
    Activities
}

export default agent;