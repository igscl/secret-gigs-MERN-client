import React, {useState} from 'react'
// import {divStyles, inputStyles, labelStyles} from '../styles'
import  {useGlobalState} from '../config/globalState'
import {setUserInSessionStorage} from '../services/authServices'
import {loginUser} from '../services/authServices'
import {
    FormControl,
    InputLabel,
    Input,
  } from "@material-ui/core";

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
        loginUser(userDetails).then((response) => {
            setUserInSessionStorage(userDetails.username)
            console.log("FROM LOGIN USER",response)
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            dispatch({
                type: "setLoggedInUserPhoneNumber",
                data: response.user.phoneNumber
            })
            console.log("RESPONSE USER",response.user.phoneNumber)
            history.push("/profile")
            
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
        
    const divStyle= {
        display: "flex",
        justifyContent: "center",
        margin: 30,
        padding: 30,
        fontSize: "1.2em",
        fontFamily: 'Noto Sans SC',
        width: "50%"
      }
  
    return (
        <div style={divStyle}>
           <form style={{ width: "70%" }} onSubmit={handleSubmit}>
             <h1>Login</h1>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            {/* <div style={dtyles}> */}
            <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Username</InputLabel>
            <Input required type="text" value={userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Password</InputLabel>
            <Input required type="password" value={userDetails.password}  name="password" placeholder="Enter a password" onChange={handleChange}></Input>
          </FormControl>
           <input type="submit" value="Login"></input>
          {/* <Button variant="contained" color="primary" size="medium">Submit </Button> */}
 
          </form>
          </div>
    )
}
export default Login

            //     {/* <label style={labelStyles}>Username</label>
            //     <input style={inputStyles} required type="text" value={userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange}></input>
            // </div> */}
            // {/* <div style={divStyles}>
            //     <label style={labelStyles}>Password</label>
            //     <input style={inputStyles} required type="password" value={userDetails.password}  name="password" placeholder="Enter a password" onChange={handleChange}></input>
            // </div>
            // <input type="submit" value="Login"></input>
            //  */}
