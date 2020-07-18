import React, {useState, useEffect} from 'react'

//styling
const EditGig = ({history, gig, updateGig}) => {
    
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
useEffect(() =>{
    gig && setFormState({
        name: gig.name,
        date: gig.date,
        generalLocation: gig.generalLocation,
        capacity: gig.capacity
    })
}, [gig])

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
    const updatedGig = {
        _id: gig._id,
        name: formState.name,
        date: formState.date,
        generalLocation: formState.generalLocation,
        capacity: formState.capacity,
    }
        updateGig(updatedGig)
        history.push("/gigs")
//    history.push(`/gigs/${nextId}`)
}
   
    return (
        <form onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Name</label>
                <input style={inputStyles} required type="text" name="name" value={formState.name} placeholder="Enter name of the gig" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Date</label>
                <input style={inputStyles}  required type="text" name="date" value={formState.date} placeholder="Enter date of the gig" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>General Location</label>
                <input style={inputStyles} required type="text" name="general location" value={formState.generalLocation} placeholder="Enter location of the gig" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Capacity</label>
                <input style={inputStyles} required type="text" name="capacity" value={formState.capacity} placeholder="Enter capacity of the gig" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Update a gig"></input>
        </form>
    )
}

export default EditGig