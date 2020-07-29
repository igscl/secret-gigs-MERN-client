import React from 'react'
import Gig from "./Gig"
import { useGlobalState } from '../config/globalState' 



const Gigs = () => {

    const { store } = useGlobalState();
    const {gigs} = store

    const divStyle= {
        fontSize: "1.2em",
        fontFamily: 'Noto Sans SC',
     
      }
      

// const Gigs = ({gigData}) => {

    return (
        
        <div style={divStyle}>
            {gigs.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)}
        {/* {gigData.sort((a,b) => b.date - a.date)
        .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)} */}
        </div>
    )
}

export default Gigs

