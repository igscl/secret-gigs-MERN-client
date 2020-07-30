import React from 'react'
import Gig from "./Gig"
import { useGlobalState } from '../config/globalState' 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const Gigs = () => {

    const { store } = useGlobalState();
    const {gigs} = store

    const divStyle= {
        fontSize: "1.2em",
        fontFamily: 'Noto Sans SC',
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));
      const classes = useStyles();


    return (
        <div style={divStyle}>
             <div className={classes.root}>
             {gigs.sort((a,b) => b.date - a.date)
        .map((gig) => 
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Gig key={gig._id} gig={gig} showControls={false}/>
          </Paper>
          </Grid>
          </Grid>
         
         )}
         </div>
         </div>
       )
     }
export default Gigs

        // {gigData.sort((a,b) => b.date - a.date)
        // .map((gig) => <Gig key={gig._id} gig={gig} showControls={false}/>)}