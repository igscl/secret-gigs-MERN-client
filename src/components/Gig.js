import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../config/globalState'
import { removeEvent, applyToEvent, selectRandomUsers } from '../services/gigServices'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Gig = ({ history, gig, showControls }) => {

    const { store, dispatch } = useGlobalState();
    // const [authenticatedUser] = useState()
    const { gigs, loggedInUserIsAdmin, loggedInUser } = store

    // If we don't have a gig, return null
    if (!gig) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black'
    }

    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }

    const { name, date, generalLocation, specificLocation, capacity } = gig
    // const allowEditDelete = loggedInUser && loggedInUser === gig.username

    //handle the delete button 
    function handleDelete(event) {
        event.preventDefault()
        // deleteGig(gig._id)
        removeEvent(gig._id).then(() => {
            const updatedGig = gigs.filter((event) => event._id !== gig._id)
            dispatch({
                type: "deleteGig",
                data: updatedGig
            })
            history.push("/gigs")
        }).catch((error) => {
            console.log("error deleting event", error)
        })
    }

    //handle the edit button 
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/gigs/edit/${gig._id}`)
    }

    //handle the apply button 
    function handleApply(event) {
        event.preventDefault()
        applyToEvent(gig).then(() => {
            const updatedGigs = gigs.filter((event) => event._id !== gig._id)
            dispatch({
                type: "applyGig",
                data: [gig, ...updatedGigs]
            })
            history.push("/profile")
        }).catch((error) => {
            console.log("error applying to event", error)
        })
    }

    //handle the event selection
    function handleSelect(event) {
        event.preventDefault()
        selectRandomUsers(gig).then(() => {
            const updatedGigs = gigs.filter((event) => event._id !== gig._id)
            dispatch({
                type: "selectUsers",
                data: updatedGigs
            })
            history.push("/gigs")
        }).catch((error) => {
            console.log("error selecting users for event", error)
        })
    }


    // console.log("What I'm looking for",loggedInUser)
    // console.log("number 2",loggedInUserIsAdmin)
    return (
        <Container>
            <p></p>
            <Row className="justify-content-center">
                <Col className="col-sm">
                    <Card
                        bg={(gig.applicants && (gig.applicants.find(x => (x.username === loggedInUser && x.accepted === true)))) ? ("success") : ("danger")}
                        key={(gig.applicants && (gig.applicants.find(x => (x.username === loggedInUser && x.accepted === true)))) ? ("success") : ("danger")}
                        text={(gig.applicants && (gig.applicants.find(x => (x.username === loggedInUser && x.accepted === true)))) ? ("light") : ("danger") === 'light' ? 'dark' : 'white'}
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{name}</Card.Header>
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>
                                <p>Date: {date}</p>
                                <p>General Location: {generalLocation}</p>

                                {gig.applicants && (gig.applicants.find(x => (x.username === loggedInUser && x.accepted === true))) && (
                                    <p>Specific Location: <span role="img" aria-label="sheep">🎉</span>
                                        {specificLocation}
                                        <span role="img" aria-label="sheep">🎉</span>
                                    </p>
                                )}
                                <p>Capacity: {capacity}</p>
                                {showControls && loggedInUserIsAdmin && (
                                    <div>
                                        <button style={buttonStyles} data-cy="editGigButton" onClick={handleEdit}>Update</button>
                                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                                        <button style={buttonStyles} onClick={handleSelect} >Select Users</button>

                                    </div>
                                )}
                                {showControls && (
                                    <div>
                                        <button style={buttonStyles} data-cy="apply-button" onClick={handleApply} >Apply!</button>
                                    </div>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>




            {/* <Row className="justify-content-center">
                <Col className="col-md-6">
                    <div>
                        <Link style={linkStyles} to={`/gigs/${gig._id}`}>
                            <h2 data-cy="gigTitle">{name}</h2>

                            <p>Date: {date}</p>
                            <p>General Location: {generalLocation}</p>

                            {gig.applicants && (gig.applicants.find(x => (x.username === loggedInUser && x.accepted === true))) && (
                                <p>Specific Location: <span role="img" aria-label="sheep">🎉</span>
                                    {specificLocation}
                                    <span role="img" aria-label="sheep">🎉</span>
                                </p>
                            )}
                            <p>Capacity: {capacity}</p>

                            {showControls && loggedInUserIsAdmin && (
                                <div>
                                    <button style={buttonStyles} data-cy="editGigButton" onClick={handleEdit}>Update</button>
                                    <button onClick={handleDelete}>Delete</button>
                                    <button className="btn btn-dark" onClick={handleSelect} >Select Users</button>

                                </div>
                            )}
                            {showControls && (
                                <div>
                                    <button style={buttonStyles} data-cy="apply-button" onClick={handleApply} >Apply!</button>
                                </div>
                            )}
                        </Link>
                    </div>
                </Col>
            </Row> */}
        </Container >
    )
}

export default Gig
