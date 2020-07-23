import api from '../config/api'

export function getUserFromSessionStorage() {
    return sessionStorage.getItem("loggedInUser")
}

export function setUserInSessionStorage(user) {
    user ? sessionStorage.setItem("loggedInUser", user)
         : sessionStorage.removeItem("loggedInUser")
}

export async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/auth/login", userInfo)
    console.log("got user back from server", response) 
    return response.data
}





