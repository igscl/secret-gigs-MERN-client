import React from 'react'
import Event from "./Event"
import { useGlobalState } from '../config/globalState' 


const Gigs= () => {
// const Gigs = ({gigData}) => {
    const {store} = useGlobalState()
    const {gigs} = store 
    return (
        <div>
            {gigs.sort((a,b) => b.date - a.date)
        .map((gig) => <Event key={gig._id} gig={gig} />)}
        {/* {gigData.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)} */}
        </div>
    )
}

export default Gigs

