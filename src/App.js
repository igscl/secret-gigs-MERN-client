import React, { useState, useEffect, useReducer} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import About from './components/About'
import Gigs from './components/Gigs'
import Gig from './components/Gig'
import gigsData from './data/gigs_data'
import NewGig from './components/NewGig'
import EditGig from './components/EditGig'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/globalState'

const App = () => {


  //global state
  const initialState = {
    loggedInUser: null,
    gigs: []
  }

  const [store, dispatch] = useReducer (stateReducer, initialState)

  const {gigs} = store;
  useEffect(() => {

    dispatch({
      type: "setGigs",
      data: gigsData
    })

  }, [])
  
  //returns a single gig based on id provided
  function getGigFromId (id) {
    return gigs.find((gig) => gig._id === parseInt(id))
  }

//adds a new gig
  function addNewGig(gig) {
    const NewGig = [...gigs, gig]
    // setGigs(NewGig)
  }


   //not needed when connected to mongo
   function getNextId() {
    const ids = gigs.map((gig) => gig._id)
    return ids.sort()[ids.length - 1] + 1
  }



  const [loggedInUser, setLoggedInUser] = useState(null)
  
  //Register user
  function handleRegister(user, history) {
    setLoggedInUser(user.username)
    history.push("/")
  }

// login user
  function handleLogin(user, history) {
    setLoggedInUser(user.username)
    history.push("/")
  }

  //logout user
  function handleLogout(){
    setLoggedInUser(null)
  }

  // show Profile
  function getProfile (user) {
    setLoggedInUser(user)
  }

  return (
   
    <div>
      <StateContext.Provider value={{store, dispatch}} >
      <BrowserRouter>
      <Nav loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} /> 
      <Route exact path="/profile" render={(props) => <Profile {...props} getProfile={getProfile}/> } />
      <Route exact path="/gigs" render={(props) => <Gigs {...props} gigData={gigs}/> } /> 
      <Route exact path="/gigs/new" render={(props) => <NewGig {...props} addNewGig={addNewGig} nextId={getNextId()} /> } />
      <Route exact path="/gigs/:id" render={(props) => <Gig {...props} gig={getGigFromId(props.match.params.id)} showControls={true}/> } />
      <Route exact path="/gigs/edit/:id" component={EditGig}/>
      <Route exact path="/auth/register" render={(props) => <Register {...props} handleRegister={handleRegister}/>} />
      <Route exact path="/auth/login" render={(props) => <Login {...props} handleLogin={handleLogin}/>} />  
      <Route component={NotFound} />
      </Switch> 
      </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App
