import React, {useState} from 'react'
import {divStyles, inputStyles, labelStyles} from '../styles'
import  {useGlobalState} from '../config/globalState'

// const Login = (props) => {
//     const {handleLogin, history} = props
const Login = ({history}) => {
    const {dispatch} = useGlobalState()

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
        // handleLogin(userDetails, history)
        dispatch ({
            type: "setLoggedInUser",
            data: userDetails.username
        })
        history.push("/profile")
    }

    // function handleSubmit(userDetails) {
	// 	loginUser(userDetails)
	// 		.then((response) => {
	// 			setLoggedInUser(response.username);
	// 			dispatch({
	// 				type: 'setLoggedInUser',
	// 				data: response.username,
	// 			});
	// 			dispatch({
	// 				type: 'setAdminUser',
	// 				data: response.admin,
	// 			});
	// 			history.push('/profile');
	// 		})
		
  
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