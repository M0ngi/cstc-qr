export function isValidEmail(email : string){
    if(email.search('@') < 1){
        return false;
    }
    return true;
}