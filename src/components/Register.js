import React, {useState} from 'react'
import {divStyles, inputStyles, labelStyles} from '../styles'

// const Register = ({history, registerUser}) => {
//     //state for controlled form
//     const initialFormState = {
//         username: "",
//         email: "",
//         phoneNumber: "",
//         password: ""
//     } 

//
function Register(props) {
    const {handleRegister, history} = props
      //state for controlled form
    const initialFormState = {
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    } 

    const [userDetails,setUserDetails] = useState(initialFormState)

    //change handler
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    //submit handler
    function handleSubmit(event) {
        event.preventDefault()
        handleRegister(userDetails, history)
    }
        // registerUser(userDetails)
        // history.push("/")
    
    return (
        <form onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Username</label>
                <input style={inputStyles} required type="text" value= {userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Email</label>
                <input style={inputStyles} required type="email" value= {userDetails.email}  name="email" placeholder="Enter an email" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Phone number</label>
                <input style={inputStyles} required type="phone number" value= {userDetails.phoneNumber}  name="phoneNumber" placeholder="Enter a phone number" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Password</label>
                <input style={inputStyles} required type="password" value= {userDetails.password} name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Register"></input>
            
        </form>
    )

}
export default Register