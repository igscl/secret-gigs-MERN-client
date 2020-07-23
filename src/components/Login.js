import React, {useState} from 'react'
import {divStyles, inputStyles, labelStyles} from '../styles'
import  {useGlobalState} from '../config/globalState'
import {setUserInSessionStorage} from '../services/authServices'
import {loginUser} from '../services/authServices'

// const Login = (props) => {
//     const {handleLogin, history} = props
const Login = ({history}) => {
    
    const initialFormState = {
        username: "",
        password: ""
    } 
    const [errorMessage, setErrorMessage] = useState(null);
    const [userDetails,setUserDetails] = useState(initialFormState);
    const {dispatch} = useGlobalState()

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
        // Attempt login on server
        loginUser(userDetails).then((user) => {
            setUserInSessionStorage(userDetails.username)
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
            
        }).catch((error) => {
            console.log(`An error occurred authenticating: ${error}`)
            setErrorMessage("Login failed. Please check your username and password");

        })		
    }

    // function handleSubmit(event) {
    //     event.preventDefault()
    //     // handleLogin(userDetails, history)
    //     setUserInSessionStorage(userDetails.username)
    //     dispatch ({
    //         type: "setLoggedInUser",
    //         data: userDetails.username
    //     })
    //     history.push("/profile")
    // }

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
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
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