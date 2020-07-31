import React, {useState, useEffect} from 'react'
import {useGlobalState} from '../config/globalState'
import {getEvent, modifyEvent} from '../services/gigServices'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//styling
const EditGig = ({history, match}) => {
    const {store, dispatch} = useGlobalState();
    const {gigs} = store
    const gigId = match && match.params ? match.params.id : -1

    const gig = getEvent(gigs, gigId)
    
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
        specificLocation: formState.specificLocation,
        capacity: formState.capacity,
    }
        // updateGig(updatedGig)
        modifyEvent(updatedGig).then(() => {
        const otherGigs = gigs.filter((gig) => gig._id !== updatedGig._id)
        dispatch({
            type: "updateGig",
            data: [updatedGig, ...otherGigs]
        })
        history.push(`/gigs/${gig._id}`)
//    history.push(`/gigs/${nextId}`)
    }).catch((error) => {
        console.log("error editing event", error)
    })
}

//state
const initialFormState = {
    name: "",
    date: "",
    generalLocation: "",
    specificLocation: "",
    capacity: ""   
}

const [formState, setFormState] = useState(initialFormState)

useEffect(() =>{
    gig && setFormState({
        name: gig.name,
        date: gig.date,
        generalLocation: gig.generalLocation,
        specificLocation: gig.specificLocation,
        capacity: gig.capacity
    })
}, [gig])

   
    return (
        
        <Container>
            <p></p>
            <Row className="justify-content-center">
                <Col className="col-md-6">
                    <Form data-cy="addGigForm" onSubmit={handleSubmit}>
                        <h2 className="center">Edit the Gig</h2>
                        {/* {
                            errorMessage &&
                            <p className="text-danger mt-3">{errorMessage}</p>
                        } */}
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control data-cy="editName" required type="text" name="name" value={formState.name} placeholder="Enter name of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control data-cy="editDate" required type="text" name="date" value={formState.date} placeholder="Enter date of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>General Location</Form.Label>
                            <Form.Control data-cy="editGeneralLocation" required type="text" name="general location" value={formState.generalLocation} placeholder="Enter general location of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Specific Location</Form.Label>
                            <Form.Control data-cy="editSpecificLocation" required type="text" name="specific location" value={formState.specificLocation} placeholder="Enter specific location of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control data-cy="editCapacity" required type="text" name="capacity" value={formState.capacity} placeholder="Enter capacity of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Button data-cy="editGigButtonSubmit" type="submit" value="Update a gig" className="btn btn-dark">Edit the Gig!</Button>
                    </Form>
                </Col>
            </Row>
        </Container >


        // <form data-cy="editGigForm" onSubmit={handleSubmit}>
        //     <div style={divStyles}>
        //         <label style={labelStyles}>Name</label>
        //         <input style={inputStyles} data-cy="editName" required type="text" name="name" value={formState.name} placeholder="Enter name of the gig" onChange={handleChange}></input>
        //     </div>
        //     <div style={divStyles}>
        //         <label style={labelStyles}>Date</label>
        //         <input style={inputStyles}  data-cy="editDate" required type="text" name="date" value={formState.date} placeholder="Enter date of the gig" onChange={handleChange}></input>
        //     </div>
        //     <div style={divStyles}>
        //         <label style={labelStyles}>General Location</label>
        //         <input style={inputStyles} data-cy="editGeneralLocation" required type="text" name="general location" value={formState.generalLocation} placeholder="Enter general location of the gig" onChange={handleChange}></input>
        //     </div>
        //     <div style={divStyles}>
        //         <label style={labelStyles}>Specific Location</label>
        //         <input style={inputStyles} data-cy="editSpecificLocation" required type="text" name="specific location" value={formState.specificLocation} placeholder="Enter specific location of the gig" onChange={handleChange}></input>
        //     </div>
        //     <div style={divStyles}>
        //         <label style={labelStyles}>Capacity</label>
        //         <input style={inputStyles} data-cy="editCapacity" required type="text" name="capacity" value={formState.capacity} placeholder="Enter capacity of the gig" onChange={handleChange}></input>
        //     </div>
        //     <input data-cy="editGigButtonSubmit" type="submit" value="Update a gig"></input>
        // </form>
    )
}

export default EditGig