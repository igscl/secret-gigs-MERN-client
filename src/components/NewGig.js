import React, { useState } from 'react'
import { useGlobalState } from '../config/globalState'
import {postEvent} from '../services/gigServices'
import {
    FormControl,
    InputLabel,
    Input,
  } from "@material-ui/core";

//styling
const NewGig = ({ history }) => {

    const { store, dispatch } = useGlobalState();
    const {gigs} = store

    // const divStyles = {
    //     display: 'grid',
    //     width: '100vw',
    // }
    // const inputStyles = {
    //     width: '70vw',
    //     margin: '.5em'
    // }
    // const labelStyles = {
    //     fontSize: '1.2em'
    // }
    //state
    const initialFormState = {
        name: "",
        date: "",
        generalLocation: "",
        specificLocation: "",
        capacity: ""
    }

    const [errorMessage, setErrorMessage] = useState(null);
    const [formState, setFormState] = useState(initialFormState)
    
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newGig = {
            name: formState.name,
            date: formState.date,
            generalLocation: formState.generalLocation,
            specificLocation: formState.specificLocation,
            capacity: formState.capacity,
        }
        postEvent(newGig).then((newGig) => {
        const otherGigs = gigs.filter((gig) => gig._id !== newGig._id)
            dispatch({
                type: "addGig",
                data: [newGig, ...otherGigs]
            })
            // addNewGig(nextGig)
            //  history.push("/")
            history.push(`/gigs/${newGig._id}`)
            
        }).catch((error) => {
            console.log("Error on server adding a new event!", error)
            setErrorMessage("You need to be an admin to add an event!");
        })
    }

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
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            <h1>Add New Gig</h1>
            <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input required type="text" name="name" placeholder="Enter name of the gig" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="date">Date</InputLabel>
            <Input required type="text" name="date" placeholder="Enter date of the gig" onChange={handleChange}></Input>
            </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="general location">General Location</InputLabel>
            <Input required type="text" name="generalLocation" placeholder="Enter location of the gig" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="specific location">Specific Location</InputLabel>
            <Input required type="text" name="specificLocation" placeholder="Enter a specific location of the gig" onChange={handleChange}></Input>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Capacity</InputLabel>
            <Input  required type="number" name="capacity" placeholder="Enter capacity of the gig" onChange={handleChange}></Input>
          </FormControl>
           <input type="submit" value="Add"></input>
          {/* <Button variant="contained" color="primary" size="medium">Submit </Button> */}
 
          </form>
          </div>
    )
}

export default NewGig

//             {/* <div style={divStyles}>
//                 <label style={labelStyles}>Name</label>
//                 <input style={inputStyles} required type="text" name="name" placeholder="Enter name of the gig" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>Date</label>
//                 <input style={inputStyles} required type="text" name="date" placeholder="Enter date of the gig" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>General Location</label>
//                 <input style={inputStyles} required type="text" name="generalLocation" placeholder="Enter location of the gig" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>Specific Location</label>
//                 <input style={inputStyles} required type="text" name="specificLocation" placeholder="Enter a specific location of the gig" onChange={handleChange}></input>
//             </div>
//             <div style={divStyles}>
//                 <label style={labelStyles}>Capacity</label>
//                 <input style={inputStyles} required type="number" name="capacity" placeholder="Enter capacity of the gig" onChange={handleChange}></input>
//             </div>
//             <input type="submit" value="Add a gig"></input>
//         </form>
//     )
// } */}
