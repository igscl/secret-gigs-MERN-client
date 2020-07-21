export function getUserFromSessionStorage() {
    return localStorage.getItem("loggedInUser")
}

export function setUserInSessionStorage(user) {
    user ? localStorage.setItem("loggedInUser", user)
        : sessionStorage.removeItem("loggedInUser")
}

