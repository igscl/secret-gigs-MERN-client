import React, {useState} from 'react'
// import {divStyles, inputStyles, labelStyles} from '../styles'
import {useGlobalState} from '../config/globalState' 
import {setUserInSessionStorage} from '../services/authServices'
import {registerUser} from '../services/authServices'
import {
    FormControl,
    InputLabel,
    Input,
  } from "@material-ui/core";


const Register = ({history}) => {
    const {dispatch} = useGlobalState()

      //state for controlled form
    const initialFormState = {
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    } 

    const [userDetails,setUserDetails] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    

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
        setUserInSessionStorage(userDetails.username)
        registerUser(userDetails)
        .then(response => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            dispatch({
                type: "setLoggedInUserPhoneNumber",
                data: response.user.phoneNumber
            })
            history.push("/")
        })
        .catch(error => {
            setErrorMessage("Something went wrong");
        })
    }
//         registerUser(userDetails)
//         history.push("/")
// }
    
const divStyles= {
    display: "flex",
    justifyContent: "center",
    margin: 30,
    padding: 30,
    fontSize: "1.2em",
    fontFamily: 'Noto Sans SC',
    width: "50%"
  }

    return (
        <div style={divStyles}>
       <form style={{ width: "70%" }} onSubmit={handleSubmit}>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            <h1>Register</h1>
            <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Username</InputLabel>
            <Input required type="text" value={userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input required type="email" value= {userDetails.email}  name="email" placeholder="Enter an email" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="phone number">Phone Number</InputLabel>
            <Input rrequired type="phone number" value= {userDetails.phoneNumber}  name="phoneNumber" placeholder="Enter a phone number" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input required type="password" value={userDetails.password}  name="password" placeholder="Enter a password" onChange={handleChange}></Input>
          </FormControl>
           <input type="submit" value="Register"></input>
           </form>
        </div>
    )

}
export default Register

// {/* /* 
//             <div style={divStyles}>
//                 <label style={labelStyles}>Username</label>
//                 <input style={inputStyles} required type="text" value= {userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>Email</label>
//                 <input style={inputStyles} required type="email" value= {userDetails.email}  name="email" placeholder="Enter an email" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>Phone number</label>
//                 <input style={inputStyles} required type="phone number" value= {userDetails.phoneNumber}  name="phoneNumber" placeholder="Enter a phone number" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>Password</label>
//                 <input style={inputStyles} required type="password" value= {userDetails.password} name="password" placeholder="Enter a password" onChange={handleChange}></input>
//             </div>
//             {/* <label for="avatar">Choose a profile picture:</label>
//             <div>
//             // <input style={inputStyles} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"></input>
//             // // </div> */}
//             {/* //  <input type="submit" value="Register"></input>  */}
//              */}
  