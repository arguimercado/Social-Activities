import { makeAutoObservable, runInAction } from 'mobx'
import { IActivity } from '../models/Activity';
import agent from '../api/agent';
import { v4 as uuid } from "uuid";

export default class ActivityStore {

   
    activityRegistry = new Map<string,IActivity>();
    selectedActivity: IActivity | null = null;
    editMode = false;
    submitLoading = false;
    deleteLoading = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }


    get activityByDate() {
        return  Array.from(this.activityRegistry.values()).sort((a,b) => 
                    Date.parse(a.date) - Date.parse(b.date))
    }

    get groupActivities() {
        return Object.entries(
            this.activityByDate.reduce((activities,activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities;
            },{} as {[key:string] : IActivity[]})
        )
    }


    loadActivity = async (id: string) => {

        let activity = this.activityRegistry.get(id);
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
    }


    loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                    this.activityRegistry.set(activity.id,activity); 
                    this.loadingInitial = false;
                })
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
                this.activityRegistry.set(activity.id,activity)
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
                this.activityRegistry.set(activity.id,activity);
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
            this.activityRegistry.delete(id)
            this.deleteLoading = false;
        })
    }






}