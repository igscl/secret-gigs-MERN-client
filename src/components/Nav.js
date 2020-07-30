import React from 'react'
import {Link} from 'react-router-dom'
import { useGlobalState } from '../config/globalState'
import {setUserInSessionStorage} from '../services/authServices'
import {logoutUser} from '../services/authServices'

// const Nav = (props) => {

//     const {loggedInUser, handleLogout} = props 

const Nav = () => {
    const { store, dispatch } = useGlobalState()
    const {loggedInUser} = store

    //logout user
    function handleLogout() {
        logoutUser()
        .then(response => console.log("successful logout: ", response.status))
        .catch(error => console.log("Server down: ", error))

        setUserInSessionStorage(null)
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
    }

    const divStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }
    const linkStyles = {
        fontSize: '1.2em',
        textDecoration: 'none',
        margin: '.5em' 
    }

    const space = {
        marginRight: '1em'
    }
    return (
        <div data-cy="navbar" style={divStyles}>
            {loggedInUser 
            ? ( 
                <div>
                    <span style ={space}>{loggedInUser}</span>
                    <Link style= {linkStyles} to="/profile">Profile</Link>
                    <Link style= {linkStyles} data-cy="gigs" to="/gigs">Gigs</Link>
                    <Link style= {linkStyles} data-cy="addGig" to="/gigs/new">Add a Gig</Link>
                    <Link style={linkStyles} data-cy="logout" to="/" onClick={handleLogout}>Logout</Link>
                </div> 
            )
            : ( 
                <div>
                    <Link style={linkStyles} data-cy="register" to="/auth/register">Register</Link>
                    <Link style={linkStyles} data-cy="login" to="/auth/login">Login</Link>
                </div> 
            ) 
            }
            <Link style={linkStyles} data-cy="home" to="/">Home</Link>
            <Link style={linkStyles} to="/about">About</Link>
            </div>
    )
}

export default Nav