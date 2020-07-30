import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../config/globalState'
import { removeEvent, applyToEvent, selectRandomUsers } from '../services/gigServices'
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';




const Gig = ({ history, gig, showControls }) => {
  

    const { store, dispatch } = useGlobalState();
    const { gigs } = store

    // If we don't have a gig, return null
    if (!gig) return null


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
    const linkStyles = {
        textDecoration: 'none',
        color: 'black'
    }

    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }
    const divStyle= {
        fontSize: "1.2em",
        fontFamily: 'Noto Sans SC',
   
    }
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       flexGrow: 1,
    //     },
    //     paper: {
    //       padding: theme.spacing(2),
    //       textAlign: 'center',
    //       color: theme.palette.text.secondary,
    //     },
    //   }));

   
    //   const classes = useStyles();

    return (
        <div style={divStyle}>
            
            <Link style={linkStyles} to={`/gigs/${gig._id}`}>
            <Grid container spacing={3}>
        <Grid item xs>
          <Paper >
                <h2>{name}</h2>

                <p>Date: {date}</p>
                <p>General Location: {generalLocation}</p>
                <p>Specific Location: {specificLocation}</p>
                <p>Capacity: {capacity}</p>
                {showControls && (
                    <div>
                        <button style={buttonStyles} onClick={handleEdit}>Update</button>
                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                        <button style={buttonStyles} onClick={handleApply} >Apply!</button>
                        <button style={buttonStyles} onClick={handleSelect} >Select Users</button>

                    </div>
                )}
                 </Paper>
          </Grid>
          </Grid>
            </Link>
        </div>
    )
}

export default Gig
