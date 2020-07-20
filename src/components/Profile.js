import React from 'react'



const Profile = (loggedInUser, user) => {


    return (
        <div>
            {loggedInUser && <header>{user.username}</header>}
        </div>
    )
}
export default Profile 