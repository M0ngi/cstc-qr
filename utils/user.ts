export interface IUserData  {
    uid?: null | string,
    address?: null | string,
    birthday?: null | string | Date | Number,
    checkedIn?: null | boolean,
    cin?: null | string | Number,
    name?: null | string,
    paidFee?: null | boolean,
    paymentMethod?: null | string,
    phone?: null | string | Number,
    roomMates?: null | string | string[],
    roomType?: null | string | Number,
    university?: null | string,
    votedFor?: null | string,
    message?: null | string,
    notificationToken?: null | string,
    email?: null | string,
    fbToken?: null | string
}


export const userData : IUserData = {
    address: null,
    birthday: null,
    checkedIn: false,
    cin: null,
    name: null,
    paidFee: false,
    paymentMethod: null,
    phone: null,
    roomMates: null,
    roomType: null,
    university: null,
    votedFor: null,
    message: null,
    notificationToken: null,
    email: null,
    fbToken: null
}

class CurrentUserStructure{
    public user : IUserData;

    constructor(){
        this.user = {...userData};
        console.log("created")
    }

    loginJson(data : IUserData){
        this.user =  {...userData, ...data};
    }

    logout(){
        this.user = {...userData};
    }

    updateInfo(data : IUserData){
        this.user = {...this.user, ...data};
    }
}

export var CurrentUser = new CurrentUserStructure();
