
export const cookieName = "USER_SESSION"
export function saveSession(
    token
){
   localStorage.setItem(cookieName,token)
}