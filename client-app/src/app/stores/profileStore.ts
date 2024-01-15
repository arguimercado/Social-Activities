import { makeAutoObservable,runInAction } from "mobx";
import agent from "../api/agent";
import { IPhoto, IProfile } from "../models/Profile";
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

    get photoCollection() {
        return this.profile?.photos;
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
    
    uploadPhoto = async (file: Blob) => {

        this.uploadingPhoto = true;
        
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            
            runInAction(() => {
                if(this.profile) {
                    this.profile.photos?.push(photo);
                    if(photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.setImage(photo.url);
                    }
                }
            })
        }catch(error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.uploadingPhoto = false;
            })
        }
    }

    setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo?.id);
            store.userStore.setImage(photo?.url);
            runInAction(() => {
                if(this.profile && this.profile.photos) {
                    this.profile.photos.find(a => a.isMain)!.isMain = false;
                    this.profile.photos.find(a => a.id === photo.id)!.isMain = true;
                    this.setImage(photo.url);
                }
            })
        }
        catch(error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if(this.profile) {
                    const newPhotos = this.profile.photos?.filter(a => a.id !== photo.id);
                    this.profile.photos = [];
                    this.profile.photos = newPhotos;
                }
            })
            return this.profile?.photos;
        
        }catch(error) {
            console.log(error); 
        }
        finally {
            runInAction(() => {
                this.loading = false;
            })
        }
        return null;
    }

    setImage = (image: string) => {
        if(this.profile) {
            this.profile.image = image;
        }
    }

}