import { makeAutoObservable,runInAction } from "mobx";
import agent from "../api/agent";
import { IProfile } from "../models/Profile";
import { store } from "./store";

export default class ProfileStore {
    
    profile: IProfile | null = null;
    loadingProfile = false;
    uploadingPhoto = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    get isCurrentUser() {
        if(this.profile?.username === store.userStore.user?.username) {
            return true;
        }

        return false;
    }

    loadProfile = async (username: string) => {
        
        this.loadingProfile = true;

        try {

            var userProfile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = userProfile;
            })
        }
        catch(error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    }   

}