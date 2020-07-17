import React from 'react'
import {Link} from 'react-router-dom'


const Gig = ({gig, showControls}) => {

    // If we don't have a post, return null
    if (!gig) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    console.log("showControls: ", showControls)
    const {name, date, generalLocation, capacity} = gig

    return (
        <div>
            <Link style={linkStyles} to={`/gigs/${gig._id}`}>
                <h2>{name}</h2>
            </Link>
			<p>Date: {date.toLocaleString()}</p>
			<p>General Location: {generalLocation}</p>
			<p>Capacity: {capacity}</p>
            {showControls && <button>Apply!</button>}
        </div>
    )
}

export default Gig
