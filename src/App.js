import React, { useEffect, useReducer} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import About from './components/About'
import Gigs from './components/Gigs'
import Event from './components/Event'
// import gigsData from './data/gigs_data'
import NewGig from './components/NewGig'
import EditGig from './components/EditGig'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/globalState'
import {getUserFromSessionStorage} from './services/authServices'
import { getAllEvents, getEventFromId } from './services/gigServices'


const App = () => {
 

  //global state
  const initialState = {
    loggedInUser: null,
    gigs: []
  }
  

  const [store, dispatch] = useReducer(stateReducer, initialState)

  const {gigs} = store;

  function fetchAllEvents() {
    getAllEvents().then((gigsData) => {
      dispatch({
        type: "setGigs",
        data: gigsData
      })
    }).catch((error) => {
      console.log("An error occurred fetching events from the server:", error) 
    })
    }

    useEffect(() => {
      fetchAllEvents()
    },[])

  // useEffect(() => {
  //   //setGigs(gigsData)
  //   //refactored using reducer
  //   dispatch({
  //     type: "setGigs",
  //     data: gigsData
      
  //   })
  // }, [])

 

 useEffect(() => {
    //check local storage for a logged in user
     const user = getUserFromSessionStorage();
    // user && setLoggedInUser(user)
    dispatch({
      type: "setLoggedInUser",
      data: user 
    })
 }, [])

//  // returns a single gig based on id provided
//   function getGigFromId (id) {
//     return gigs.find((gig) => gig._id === parseInt(id))
//   }


   //not needed when connected to mongo
   function getNextId() {
    const ids = gigs.map((gig) => gig._id)
    return ids.sort()[ids.length - 1] + 1
  }

  

  return (
   
    <div>
       <StateContext.Provider value={{store, dispatch}} >
      <BrowserRouter>
      <Nav />
      <h1>Secret gig</h1>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} /> 
      <Route exact path="/gigs" component={Gigs} />
      <Route exact path="/gigs/new" render={(props) => <NewGig {...props} nextId={getNextId()} /> } />
      <Route exact path="/gigs/:id" render={(props) => <Event  {...props} gig={getEventFromId(gigs, props.match.params.id)} showControls /> } />
      {/* <Route exact path="/posts/:id" render={(props) => <BlogPost {...props} post={getPostFromId(blogPosts,props.match.params.id)} showControls /> } /> */}
      <Route exact path="/gigs/edit/:id" component= {EditGig} /> 
      <Route exact path="/auth/register" component={Register} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route component={NotFound} />
      </Switch> 
      </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}
 

export default App
