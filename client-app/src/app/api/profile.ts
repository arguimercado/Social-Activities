import { request } from "./http";
import { IPhoto, IProfile } from "../models/Profile";
import axios from "axios";

const Profiles = {
    get: (username: string) => request.get<IProfile>(`/profile/${username}`),
    
    uploadPhoto: (photo: Blob) => {

        let formData = new FormData();
        formData.append('File', photo);
        
        return axios.post<IPhoto>('photos',formData,{
            headers: {'Content-type': 'multipart/form-data'}
        })
    },
    setMainPhoto: (id: string) => request.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => request.del(`/photos/${id}`),
}

export default Profiles;