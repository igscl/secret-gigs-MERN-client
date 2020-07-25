import React from 'react'
import Gig from "./Gig"
import { useGlobalState } from '../config/globalState' 


const Gigs = () => {

    const { store } = useGlobalState();
    const {gigs} = store


// const Gigs = ({gigData}) => {

    return (
        <div>
            {gigs.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)}
        {/* {gigData.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)} */}
        </div>
    )
}

export default Gigs

