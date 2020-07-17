import React from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {

    const {loggedInUser, handleLogout} = props 

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
        <div style={divStyles}>
            {loggedInUser 
            ? ( 
                <div>
                    <span style ={space}>{loggedInUser}</span>
                    <Link style={linkStyles} to="/" onClick={handleLogout}>Logout</Link>
                    <Link style= {linkStyles} to="/gigs">Gigs</Link>
                    <Link style= {linkStyles} to="/gigs/new">Add a Gig</Link>
                </div> 
            )
            : ( 
                <div>
                    <Link style={linkStyles} to="/auth/register">Register</Link>
                    <Link style={linkStyles} to="/auth/login">Login</Link>
                </div> 
            ) 
            }
            <Link style={linkStyles} to="/">Home</Link>
            <Link style={linkStyles} to="/about">About</Link>
            </div>
    )
}

export default Nav