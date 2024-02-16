import { makeAutoObservable, runInAction } from 'mobx'
import { IActivity } from '../models/Activity';
import agent from '../api/agent';
import { v4 as uuid } from "uuid";
import { format } from 'date-fns';
import { store } from './store';

export default class ActivityStore {

   
    activityRegistry = new Map<string,IActivity>();
    activity: IActivity | null = null;
    editMode = false;
    submitLoading = false;
    deleteLoading = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get selectedActivity() {
        return this.activity;
    }

    get activityByDate() {
        return  Array.from(this.activityRegistry.values()).sort((a,b) => 
                    a.date!.getTime() - b.date!.getTime())
    }

    get groupActivities() {
        return Object.entries(
            this.activityByDate.reduce((activities,activity) => {
                const date = format(activity!.date!, 'dd MMMM yyyy');
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities;
            },{} as {[key:string] : IActivity[]})
        )
    }

    get guestActivities() {
        return this.activity?.attendees.filter(a => !a.isHost);
    }


    loadActivity = async (id: string,force?: boolean) => {

        let activity = this.activityRegistry.get(id);
        if (activity && !force) {
            this.activity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity!);
                runInAction(() => {
                    this.activity = activity ?? null;
                    this.loadingInitial = false;
                    
                })
                return activity;
            } 
            catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    }

    private setActivity = (activity: IActivity) => {
        
        const user = store.userStore.user;

        activity.date = new Date(activity.date!)
        activity.host = activity.attendees.find(x => x.isHost);
        activity.isGoing = activity.attendees.some(x => x.username === user?.username);
        
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
                this.activity = { ...activity }
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
                this.activity = { ...activity };
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

    updateAttendance = async (activityId: string) => {
        this.loading = true;
        try {
            await agent.Activities.attend(activityId);
        } 
        catch (error) {
            console.log(error);
        } 
        finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedActivity = () => {
        this.activity = null;
    }

}