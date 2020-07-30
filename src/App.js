import React, { useEffect, useReducer, useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import About from './components/About'
import Gigs from './components/Gigs'
import Gig from './components/Gig'
// import gigsData from './data/gigs_data'
import NewGig from './components/NewGig'
import EditGig from './components/EditGig'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/globalState'
import {userAuthenticated} from './services/authServices'
import { getEvents, getEvent } from './services/gigServices'


const App = () => {
 

  //global state
  const initialState = {
    loggedInUser: null,
    gigs: []
  }
  
// for authenticated user
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  const [store, dispatch] = useReducer(stateReducer, initialState)

  const {gigs} = store;

  function fetchAllEvents() {
    getEvents().then((gigsData) => {
      dispatch({
        type: "setGigs",
        data: gigsData
      })
    }).catch((error) => {
      console.log("An error occurred fetching events from the server:", error) 
    })
    }

  useEffect(() => { 
    userAuthenticated()
      .then((user) => {
        setAuthenticatedUser(user) 
          dispatch({ type: "setLoggedInUser", data: user.username }) 
      })
      .catch((err) => {
        // setAuthenticatedUser(null)
        dispatch({ type: "setLoggedInUser", data: null }) 
    })
  }, [])
  useEffect(() => {
      fetchAllEvents()
    },[authenticatedUser])

  // useEffect(() => {
  //   //setGigs(gigsData)
  //   //refactored using reducer
  //   dispatch({
  //     type: "setGigs",
  //     data: gigsData
      
  //   })
  // }, [])

 
//  useEffect(() => {
//     //check local storage for a logged in user
//      const user = getUserFromSessionStorage();
//     // user && setLoggedInUser(user)
//     dispatch({
//       type: "setLoggedInUser",
//       data: user 
//     })
//  }, [])

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
       <StateContext.Provider value={{store, dispatch, authenticatedUser, setAuthenticatedUser}} >
      <BrowserRouter>
      <Nav />
      <h1>Secret Gigs</h1>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} /> 
      <Route exact path="/gigs" component={Gigs} />
      <Route exact path="/gigs/new" render={(props) => <NewGig {...props} nextId={getNextId()} /> } />
      <Route exact path="/gigs/:id" render={(props) => <Gig  {...props} gig={getEvent(gigs, props.match.params.id)} showControls /> } />
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
