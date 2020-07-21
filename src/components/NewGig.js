import React, {useState} from 'react'
import {useGlobalState} from '../config/globalState'

//styling
const NewGig = ({history, nextId}) => {

    const {dispatch} = useGlobalState();

    const divStyles = {
        display: 'grid',
        width: '100vw',
    }
    const inputStyles = {
        width: '70vw',
        margin: '.5em'
    }
    const labelStyles = {
        fontSize: '1.2em'
    }
 //state
 const initialFormState = {
    name: "",
    date: "",
    generalLocation: "",
    capacity: ""   
}

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
    const nextGig = {
        _id: nextId,
        name: formState.name,
        date: formState.date,
        generalLocation: formState.generalLocation,
        capacity: formState.capacity,
    }
    dispatch ({
        type: "addGig",
        data: nextGig
    })
    // addNewGig(nextGig)
    //  history.push("/")
   history.push(`/gigs/${nextId}`)
}
   
    return (
        <form onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Name</label>
                <input style={inputStyles} required type="text" name="name" placeholder="Enter name of the gig" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Date</label>
                <input style={inputStyles}  required type="text" name="date" placeholder="Enter date of the gig" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>General Location</label>
                <input style={inputStyles} required type="text" name="general location" placeholder="Enter location of the gig" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Capacity</label>
                <input style={inputStyles} required type="text" name="capacity" placeholder="Enter capacity of the gig" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Add a gig"></input>
        </form>
    )
}

export default NewGig