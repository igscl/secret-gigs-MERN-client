import React, { useState } from 'react'
import { useGlobalState } from '../config/globalState'
import {postEvent} from '../services/gigServices'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//styling
const NewGig = ({ history }) => {

    const { store, dispatch } = useGlobalState();
    const {gigs} = store

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

    return (

        <Container>
            <p></p>
            <Row className="justify-content-center">
                <Col className="col-md-6">
                    <Form data-cy="addGigForm" onSubmit={handleSubmit}>
                        <h2 className="center">Add a Gig</h2>
                        {
                            errorMessage &&
                            <p className="text-danger mt-3">{errorMessage}</p>
                        }
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control data-cy="name" required type="text" name="name" placeholder="Enter name of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control data-cy="date" required type="text" name="date" placeholder="Enter date of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>General Location</Form.Label>
                            <Form.Control data-cy="generalLocation" required type="text" name="generalLocation" placeholder="Enter location of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Specific Location</Form.Label>
                            <Form.Control data-cy="specificLocation" required type="text" name="specificLocation" placeholder="Enter a specific location of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control data-cy="capacity" required type="number" name="capacity" placeholder="Enter capacity of the gig" onChange={handleChange} />
                        </Form.Group>
                        <Button data-cy="addGigButton" type="submit" value="Add a gig" className="btn btn-dark" >Add the Gig!</Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default NewGig