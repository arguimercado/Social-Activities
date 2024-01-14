import { User, UserFormValues, UserLogin } from "../models/User";
import { request } from "./http";

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserLogin) => request.post<User>('/account/login',user),
    register: (user: UserFormValues) => request.post<User>('/account/register',user)
}

export default Account;