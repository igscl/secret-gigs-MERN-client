import api from '../config/api'

export function getUserFromSessionStorage() {
    return sessionStorage.getItem("loggedInUser")
}

export function getAdminFromSessionStorage() {
    return sessionStorage.getItem("loggedInUserIsAdmin")
}

export function setAdminInSessionStorage(admin) {
    admin ? sessionStorage.setItem("loggedInUserIsAdmin", admin)
         : sessionStorage.removeItem("loggedInUserIsAdmin")
}

export function setUserInSessionStorage(user) {
    user ? sessionStorage.setItem("loggedInUser", user)
         : sessionStorage.removeItem("loggedInUser")
}



export async function userAuthenticated() {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.get("/auth/user")
    console.log("got user back from server", response) 
    return response.data
}
export async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/auth/login", userInfo)
    console.log("got user back from server", response) 
    return response.data
}

export async function registerUser(userInfo) {
    // call to server to register user
    const response = await api.post("/auth/register", userInfo)
    console.log("got user back from server", response)
    return response.data
}

export async function logoutUser() {
    // call to server to logout user
    return api.get("/auth/logout")
}

