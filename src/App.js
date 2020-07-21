import React, { useEffect, useReducer} from 'react'
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
  // const [gigs, setGigs] = useState([])
  //const [loggedInUser, setLoggedInUser] = useState(null)

  //global state
  const initialState = {
    loggedInUser: null,
    gigs: []
  }
  

  const [store, dispatch] = useReducer(stateReducer, initialState)

  const { gigs, loggedInUser }= store;

  useEffect(() => {
    //setGigs(gigsData)
    //refactored using reducer
    dispatch({
      type: "setGigs",
      data: gigsData
      
    })
  }, [])

 

//  useEffect(() => {
// //     //check local storage for a logged in user
//     //  const user = getUserFromLocalStorage();
// //     // user && setLoggedInUser(user)
//     dispatch({
//       type: "setLoggedInUser",
//       data: user 
//     })
//  }, [])

//   // setting up local storage
//  function setUserinLocalStorage(user) {
//     user ? localStorage.setItem("loggedInUser", user)
//     : localStorage.removeItem("loggedInUser")
//   }
//    //get user from local storage
//    function getUserFromLocalStorage() {
//     return localStorage.getItem("loggedInUser")
//   }


  //returns a single gig based on id provided
  function getGigFromId (id) {
    return gigs.find((gig) => gig._id === parseInt(id))
  }

//adds a new gig
  function addNewGig(gig) {
    // const NewGig = [...gigs, gig]
    // setGigs(NewGig)
    dispatch({
      type: "addGig",
      data: gig 
    })
  }


   //not needed when connected to mongo
   function getNextId() {
    const ids = gigs.map((gig) => gig._id)
    return ids.sort()[ids.length - 1] + 1
  }

  //delete a gig that matched id
  function deleteGig(id) {
    // const otherGig = gigs.filter((gig) => gig._id !== parseInt(id))
    // setGigs(otherGig)
    dispatch({
      type: "deleteGig",
      data: id
    })
  }

  function updateGig(updatedGig) {
    // const otherGig = gigs.filter((gig) => gig._id !== parseInt(updatedGig._id))
    // setGigs([...otherGig,updatedGig])
    dispatch({
      type: "updateGig",
      data: updatedGig
    })
  }
  
  
  //Register user
  function handleRegister(user, history) {
    // setLoggedInUser(user.username);
    // setUserinLocalStorage(user.username);
    // history.push("/")
    dispatch ({
      type: "setLoggedInUser",
      data: user.username
    })
    history.push("/")
  }

// login user
  function handleLogin(user, history) {
    // setLoggedInUser(user.username)
    // setUserinLocalStorage(user.username)
    dispatch ({
      type: "setLoggedInUser",
      data: user.username
    })
    history.push("/")
  }

  //logout user
  //clearing local storage in logout
  function handleLogout(){
    // setLoggedInUser(null)
    // setUserinLocalStorage(null)
    dispatch ({
      type: "setLoggedInUser",
      data: null
    })
  }

  function showProfile(user, history) {
    // setLoggedInUser(user.username)
    dispatch ({
      type: "setLoggedInUser",
      data: user.username
    })
    history.push("/profile")
  }

  return (
   
    <div>
       <StateContext.Provider value={{store, dispatch}} >
      <BrowserRouter>
      <Nav loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <h1>Secret gig</h1>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} /> 
      <Route exact path="/gigs" component={Gigs} />
      {/* <Route exact path="/gigs" render={(props) => <Gigs {...props} gigData={gigs}/> } />  */}
      <Route exact path="/gigs/new" render={(props) => <NewGig {...props} addNewGig={addNewGig} nextId={getNextId()} /> } />
      <Route exact path="/gigs/:id" render={(props) => <Gig {...props} gig={getGigFromId(props.match.params.id)} showControls={true} deleteGig={deleteGig}/> } />
      <Route exact path="/gigs/edit/:id" render={(props) => <EditGig {...props} gig={getGigFromId(props.match.params.id)} updateGig={updateGig} /> } />
      <Route exact path="/auth/register" render={(props) => <Register {...props} handleRegister={handleRegister}/>} />
      <Route exact path="/auth/login" render={(props) => <Login {...props} handleLogin={handleLogin}/>} />  
      <Route exact path="/profile" render={(props) => <Profile {...props} showProfile={showProfile}/>} />  
      <Route component={NotFound} />
      </Switch> 
      </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App
