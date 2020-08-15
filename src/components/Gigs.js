import React from 'react'
import Gig from "./Gig"
import { useGlobalState } from '../config/globalState' 


const Gigs = () => {

    const { store } = useGlobalState();
    const {gigs} = store

    if(gigs === []) {
        return <p>loading...</p>
    }

// const Gigs = ({gigData}) => {

    return (
        <div data-cy="gigsProfile">
            <p></p>
                    <p className= "text-center m-5"> This is a list of all the available gigs. After you hit apply there's a random selection process close to the event's date. If you get selected you'll receive an SMS message with a token to invite up to 5 friends. Your event will also show as "accepted" and you'll be able to see the location. Your friends only need to text the token to our number, if they have an account and have applied for the event they'll get automatically accepted. If they don't have an account we'll create one for them and get them into the first event they apply to.</p>
            {gigs.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)}
        {/* {gigData.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)} */}
        </div>
    )
}

export default Gigs

