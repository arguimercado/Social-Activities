export interface IAttendee {
    userId: string;
    username: string;
    displayname: string;
    bio?: any;
    isHost: boolean;
    date: string;
    image?: any;
    isCancelled: boolean;
    dateCancelled?: any;
}