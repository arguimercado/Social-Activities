import { IActivity } from "../models/Activity";
import { request } from "./http";


const Activities = {
    list: () => request.get<IActivity[]>('/activities'),
    details: (id: string) => request.get<IActivity>(`/activities/${id}`),
    create: (activity : IActivity) => request.post<void>('/activities',activity),
    update: (activity: IActivity) => request.put<void>(`/activities/${activity.id}`,activity),
    delete: (id: string) => request.del<void>(`/activities/${id}`),
    attend: (id: string) => request.post<void>(`/activities/${id}/attend`,{}),
}

export default Activities;
