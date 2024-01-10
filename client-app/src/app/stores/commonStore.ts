import { IServerError } from "../context/ErrorContext";
import {makeAutoObservable,reaction} from 'mobx'

export default class CommonStore {

    error: IServerError | null = null;
    token: string | null | undefined = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt',token)
                }
                else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError = (error: IServerError) => {
        this.error = error;
    }

    setToken = (token: string | null | undefined) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}