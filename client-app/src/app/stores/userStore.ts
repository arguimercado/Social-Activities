import agent from "../api/agent";
import { User, UserFormValues, UserLogin } from "../models/User";
import { makeAutoObservable,runInAction } from "mobx";
import { store } from "./store";
import { router } from "../router/Route";

export default class UserStore {
    user: User | null = null;
    
    constructor() { 
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    setImage = (image: string) => {
        if(this.user) {
            this.user.image = image;
        }
    }

    setDisplayName = (name: string) => {
        this.user!.displayname = name;
    }

    login = async (creds: UserLogin) => {
        try {

            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/activities');
        }
        catch(error) {
            console.log(error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    register = async (registerForm: UserFormValues) => {
        
        var user = await agent.Account.register(registerForm);
        store.commonStore.setToken(user.token);
        runInAction(() => {
            this.user = user;
        });
        router.navigate('/activities');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user
              
            });
        }
        catch(error) {
            console.log(error);
        }
    }
}