import { makeAutoObservable, runInAction } from 'mobx'
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





    loadActivity = async (id: string) => {

        let activity = this.activities.find(x => x.id == id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity!);
                runInAction(() => {
                    this.selectedActivity = activity ?? null;
                    this.loadingInitial = false;
                })
                return activity;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }


        }
    }

    private setActivity = (activity: IActivity) => {
        activity.date = activity.date.split('T')[0];
        this.activities.push(activity)
    }


    loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
                this.loadingInitial = false;
            })
        }
        catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    updateActivity = async (activity: IActivity) => {
        this.submitLoading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
                this.editMode = false;
                this.selectedActivity = { ...activity }
                this.submitLoading = false;
            });
            return activity;
        } catch (error) {
            console.log(error);
            this.submitLoading = false;
        }
    }

    saveActivity = async (activity: IActivity) => {
        this.submitLoading = true;
        try {
            activity.id = uuid();
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities = [...this.activities, activity]
                this.editMode = false;
                this.selectedActivity = { ...activity };
                this.submitLoading = false;
            });
            return activity;

        }
        catch (error) {
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






}