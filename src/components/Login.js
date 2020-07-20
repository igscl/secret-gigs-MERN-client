import React, {useState} from 'react'
import {divStyles, inputStyles, labelStyles} from '../styles'

const Login = (props) => {
    const {handleLogin, history} = props
    const initialFormState = {
        username: "",
        password: ""
    } 
    const [userDetails,setUserDetails] = useState(initialFormState)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        handleLogin(userDetails, history)

    }
  
  
    return (
        <form onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Username</label>
                <input style={inputStyles} required type="text" value={userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Password</label>
                <input style={inputStyles} required type="password" value={userDetails.password}  name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Login"></input>
            
        </form>
    )
}
export default Login