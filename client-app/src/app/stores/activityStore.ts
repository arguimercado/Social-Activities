import { makeAutoObservable,runInAction } from 'mobx'
import { IActivity } from '../models/Activity';
import agent from '../api/agent';
import { v4 as uuid } from "uuid";

export default class ActivityStore {

    activities: IActivity[] = [];
    selectedActivity: IActivity | null = null;
    editMode = false;
    submitLoading = false;
    deleteLoading = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getActivity() {
        return this.selectActivity;
    }


    loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity)
                this.loadingInitial = false;
            })
        }
        catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    selectActivity = (activityId: string) => {

        this.selectedActivity = this.activities.find(x => x.id === activityId) ?? null;
        this.editMode = false;
    }

    createNewActivity = () => {
        this.selectedActivity = null;
        this.editMode = true;
    }

    editActivity = () => {
        this.editMode = true;
    }

    saveUpdateActivity = async (activity: IActivity) => {
        this.submitLoading = true;
        try {
            if (activity.id) {
                await agent.Activities.update(activity);
                runInAction(() => {
                    this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
                    this.editMode = false;
                    this.selectedActivity = {...activity}
                    this.submitLoading = false;
                })
            }
            else {
                activity.id = uuid();
                await agent.Activities.create(activity);
                runInAction(() => {
                    this.activities = [...this.activities, activity]
                    this.editMode = false;
                    this.selectedActivity = {...activity};
                    this.submitLoading = false;
                })
            }

        }
        catch(error) {
            this.submitLoading = false;
        }
        
    }

    deleteActivity = async (id: string) => {
        this.deleteLoading = true;
        await agent.Activities.delete(id);
        runInAction(() => {
            this.activities = [...this.activities.filter((x) => x.id !== id)];
            this.deleteLoading = false;
        })
    }


    cancelTransaction = () => {
        this.editMode = false;
        
    }





}