import { auth, firestore, rtdb } from './../../config'; // Init config
import { setDoc, doc, getDocFromServer, runTransaction, updateDoc, collection, where, query, getDoc, getDocs } from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { ErrorCodes } from '../../const/errorCodes';
import { USER_PATH, PHONE_EMAIL_PATH, STAFF_PATH } from './../../const/firestorePaths';
import { CurrentUser, IUserData } from '../../utils/user';
import { signOut } from '../auth/loginService';


export async function getPath(path: string){
    return (await getDocFromServer(doc(firestore, path)));
}

export async function setPathValues(path: string, values: any){
    await setDoc(
        doc(firestore, path),
        values
    )
}

export async function updatePathValues(path: string, values: any){
    await updateDoc(
        doc(firestore, path),
        values
    )
}

export async function isCurrentUserInited(){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

    return (await getPath(USER_PATH+auth.currentUser.uid)).exists()
}

export async function getCurrentUserData(uid: string | null = null) : Promise<IUserData>{
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);
    const target = (uid ?? auth.currentUser.uid);

    console.log("getdata")
    console.log(target);

    let dataDoc = await getPath(USER_PATH+target).catch(
        ()=>{
            if(!uid) signOut();
            throw new FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])
        }
    );
    if(!dataDoc){ 
        if(!uid) signOut();
        throw new FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1]);
    }
    
    let data = dataDoc.data();
    if(!data) { 
        if(!uid) signOut();
        throw new FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1]);
    }

    console.log("here")

    let phoneDoc = await getPath(PHONE_EMAIL_PATH+auth.currentUser.uid).catch(
        ()=>{
            if(!uid) signOut();
            throw new FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])
        }
    );
    if(!phoneDoc){ 
        if(!uid) signOut();
        throw new FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1]);
    }

    let phone = phoneDoc.data();
    if(!phone) {
        if(!uid) signOut();
        throw new FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])
    }
    
    let email = phone.email;
    if(phone.newEmail){
        if(phone.newEmail !== phone.email && auth.currentUser.email === phone.newEmail){
            await updatePathValues(PHONE_EMAIL_PATH+auth.currentUser.uid, {email: phone.newEmail});
            email = phone.newEmail;
        }
    }

    return {...data, votedFor: null, phone: phone.phone, email: email}; // Vote isn't needed here
}

export async function readDataFromPath(path:string){
    let d = await getPath(path);
    return (d.exists() ? d.data() : null)
}

export async function linkPhoneToEmail(phone:string){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

    const phoneDoc = doc(firestore, PHONE_EMAIL_PATH + auth.currentUser.uid);

    // Transactions: Do all or nothing
    await runTransaction(firestore, async (transaction)=>{
        transaction.update(phoneDoc, {phone: phone})
        CurrentUser.user.phone = phone;
    }).catch(()=>{
        throw new FirebaseError(ErrorCodes.ERROR_LINK_PHONE[0], ErrorCodes.ERROR_LINK_PHONE[1]);
    })
}

export async function phoneToEmail(number:string){
    const usersColl = collection(firestore, PHONE_EMAIL_PATH);
    const q1 = query(usersColl, where("phone", "==", number));

    const phoneCheck = await getDocs(q1);

    if(phoneCheck.size == 1) {
        return phoneCheck.docs[0].data().email;
    }
    return null;
}

export async function markCheckedIn(uid:string) {
    let userDoc = await getPath(USER_PATH+uid);
    if(!userDoc.exists())
        throw new FirebaseError(ErrorCodes.ACC_NOT_EXIST[0], ErrorCodes.ACC_NOT_EXIST[1]);

    await updatePathValues(USER_PATH+uid, {checkedIn: true}).catch(
        (err)=>{
            console.log("check-in err");
            console.log(err);
            throw new FirebaseError(ErrorCodes.ERROR_WHEN_CHECKIN[0], ErrorCodes.ERROR_WHEN_CHECKIN[1]);
        }
    )
    return true;
}

export async function isStaff(uid: string):Promise<boolean>{
    let userDoc = await getPath(STAFF_PATH+uid);
    if(!userDoc.exists())
        return false;

    return true;
}