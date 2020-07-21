import React from 'react'

const Profile = ({user}) => {
    return (
        <div>
            <h1>User Profile</h1>
            <p>{user.username}</p>

            </div>
    )
}

export default Profile