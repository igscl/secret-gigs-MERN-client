import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../config/globalState'
import { removeEvent, applyToEvent, selectRandomUsers } from '../services/gigServices'



const Gig = ({ history, gig, showControls }) => {

    const { store, dispatch } = useGlobalState();
    // const [authenticatedUser] = useState()
    const { gigs, loggedInUserIsAdmin, loggedInUser} = store

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
                data: updatedGigs
            })
            history.push("/gigs")
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
    console.log("What I'm looking for",loggedInUser)
    console.log("number 2",loggedInUserIsAdmin)
    return (
        <div>
            <Link style={linkStyles} to={`/gigs/${gig._id}`}>
                <h2 data-cy="gigTitle">{name}</h2>

                <p>Date: {date}</p>
                <p>General Location: {generalLocation}</p>

                <p>Specific Location: {specificLocation}</p>
                
                <p>Capacity: {capacity}</p>

                {showControls && loggedInUserIsAdmin &&(
                    <div>
                        <button style={buttonStyles} data-cy="editGigButton" onClick={handleEdit}>Update</button>
                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                        <button style={buttonStyles} onClick={handleSelect} >Select Users</button>

                    </div>
                )}
                {showControls &&(
                    <div>
                        <button style={buttonStyles} data-cy="apply-button" onClick={handleApply} >Apply!</button>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default Gig
