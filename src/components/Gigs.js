import React from 'react'
import Gig from "./Gig"


const Gigs = ({gigData}) => {
    return (
        <div>
        {gigData.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)}
        </div>
    )
}

export default Gigs

