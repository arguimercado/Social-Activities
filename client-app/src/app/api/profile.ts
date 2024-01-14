import { request } from "./http";
import { IProfile } from "../models/Profile";

const Profiles = {
    get: (username: string) => request.get<IProfile>(`/profile/${username}`),
    
}

export default Profiles;