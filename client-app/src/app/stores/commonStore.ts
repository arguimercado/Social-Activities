import { IServerError } from "../context/ErrorContext";
import {makeAutoObservable} from 'mobx'

export default class CommonStore {
    error: IServerError | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setServerError = (error: IServerError) => {
        this.error = error;
    }
}