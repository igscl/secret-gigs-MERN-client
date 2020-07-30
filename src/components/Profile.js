import React, {useState, useEffect} from 'react'
import { useGlobalState } from '../config/globalState'
// import {setUserInSessionStorage} from '../services/authServices'
import api from '../config/api'
import Gig from './Gig'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';


function Profile() {

    
    const {store} = useGlobalState();
    const {loggedInUser} = store

    const [userEvents, setUserEvents]= useState([])

    useEffect(() => {
        api.get("/events/myevents").then((response) => {
            setUserEvents(response.data)
        })
    }, [])
    console.log(userEvents)

      const divStyle= {  
        fontSize: "1.2em",
        fontFamily: 'Noto Sans SC',
      }


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

    const classes = useStyles()
    // const {username, email, phoneNumber, eventsApplied} = user

    return (
        <div style={divStyle}>
            <h1>Profile</h1>
            {loggedInUser && <h2>{`Hello, ${loggedInUser}`}</h2>}<br></br>
            <h2>Your events:</h2>
             {userEvents && userEvents.map((event, index)=> (
                <Card className={classes.root}>
                <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>  
                </Typography>
                <Typography variant="body2" component="p">
            <Gig key={event._id} gig={event} showControls={false}/>
        </Typography>
      </CardContent>  
    </Card>
    )
    )}
    </div>
  )
}
 export default Profile

//             {/* {loggedInUser && <header>{loggedInUser}</header>}
//             {userEvents && userEvents.map((event, index)=> (
//             <Gig key={event._id} gig={event} showControls={false}/>)
//             )}
            

//         </div>
//     )
// }
// export default Profile  */}




