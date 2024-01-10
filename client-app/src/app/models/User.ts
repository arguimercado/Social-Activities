export interface User {
    username: string;
    displayname: string;
    token: string;
    image?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    confirmPassword: string;
    displayname?: string;
    username?: string;
    error?: string
}