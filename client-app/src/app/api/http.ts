import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Route";
import { store } from "../stores/store";

axios.defaults.baseURL =  "http://localhost:5000/api";


const sleep = (delay: number) => {

    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
   
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data,status,config} = error.response! as AxiosResponse;
    switch(status) {
        case 400:
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors,'id')) {
                router.navigate('/not-found');
            }
            if(data.errors) {
                const modalStateErrors = [];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else {
                toast.error(data)
            }

            break;
        case 401:
            toast.error("Unauthorized")
            break;
        case 403:
            toast.error("Forbidden")
            break;
        case 404:
            router.navigate('not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
    }
    return Promise.reject(error);
})

export const responseBody = <T>(response: AxiosResponse<T>) => response.data;
export const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string,body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url: string,body: {}) => axios.put<T>(url,body).then(responseBody),
    del:<T> (url: string) => axios.delete<T>(url).then(responseBody),
    
}