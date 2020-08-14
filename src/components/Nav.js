import React from 'react'
import { useGlobalState } from '../config/globalState'
import {setUserInSessionStorage} from '../services/authServices'
import {logoutUser} from '../services/authServices'
import classnames from "classnames";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
// import Collapse from 'react-bootstrap/Collapse'
// import NavbarBrand from 'react-bootstrap/NavbarBrand'
// import Navbar from 'react-bootstrap/Navbar'
// import NavItem from 'react-bootstrap/NavItem'
// import NavLink from 'react-bootstrap/NavLink'
// import Nav from 'react-bootstrap/Nav'
// import Container from 'react-bootstrap/Container'
// const Nav = (props) => {

//     const {loggedInUser, handleLogout} = props 

const Navi = () => {
    const { store, dispatch } = useGlobalState()
    const {loggedInUser} = store

    //
    // const [navbarColor, setNavbarColor] = React.useState("navbar");
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  
    const toggleNavbarCollapse = () => {
      setNavbarCollapse(!navbarCollapse);
      document.documentElement.classList.toggle("nav-open");
    };
  
    // React.useEffect(() => {
    //   const updateNavbarColor = () => {
    //     if (
    //       document.documentElement.scrollTop > 299 ||
    //       document.body.scrollTop > 299
    //     ) {
    //       setNavbarColor("");
    //     } else if (
    //       document.documentElement.scrollTop < 300 ||
    //       document.body.scrollTop < 300
    //     ) {
    //       setNavbarColor("navbar");
    //     }
    //   };
  
    //   window.addEventListener("scroll", updateNavbarColor);
  
    //   return function cleanup() {
    //     window.removeEventListener("scroll", updateNavbarColor);
    //   };
    // });
    //

    //logout user
    function handleLogout() {
        logoutUser()
        .then(response => console.log("successful logout: ", response.status))
        .catch(error => console.log("Server down: ", error))

        setUserInSessionStorage(null)
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
    }

    // const divStyles = {
    //     display: 'flex',
    //     justifyContent: 'space-between'
    // }
    // const linkStyles = {
    //     fontSize: '1.2em',
    //     textDecoration: 'none',
    //     margin: '.5em' 
    // }

    // const space = {
    //     marginRight: '1em'
    // }
    return (
        <Navbar expand="lg">
      <Container>
        <div className="navbar-translate text-uppercase">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            title="Home"
          >
            {"Home" && loggedInUser}
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar data-cy="navbar">
         

{/* test */}

          {loggedInUser 
            ? ( 
                <React.Fragment>
                <NavItem>
                <NavLink
                  href="/profile"             >
                  <i className="nc-icon nc-book-bookmark" /> Profile
                </NavLink>
              </NavItem>
  
            <NavItem>
                <NavLink
                  href="/gigs"
                  data-cy="gigs"              >
                  <i className="nc-icon nc-book-bookmark" /> Gigs
                </NavLink>
              </NavItem>
  
            <NavItem>
                <NavLink
                  href="/gigs/new"
                  data-cy="addGig"
                >
                  <i className="nc-icon nc-book-bookmark" /> Add a Gig
                </NavLink>
              </NavItem>
  
              <NavItem>
                <NavLink
                  href="/"
                  onClick={handleLogout}
                  data-cy="logout"
                >
                  <i className="nc-icon nc-book-bookmark" /> Logout
                </NavLink>
              </NavItem>
              </React.Fragment>
            )
            : ( 
                <React.Fragment>
          <NavItem>
              <NavLink
                href="/auth/register"
                data-cy="register"
              >
                <i className="nc-icon nc-book-bookmark" /> Register
              </NavLink>
            </NavItem>
          <NavItem>
              <NavLink
                href="/auth/login"
                data-cy="login"             >
                <i className="nc-icon nc-book-bookmark" /> Login
              </NavLink>
            </NavItem>
                            </React.Fragment>
            ) 
            }
{/* test */}




          </Nav>
        </Collapse>
      </Container>
    </Navbar>
        // <div data-cy="navbar" style={divStyles}>
            // {loggedInUser 
            // ? ( 
            //     <div>
            //         <span style ={space}>{loggedInUser}</span>
            //         <Link style= {linkStyles} to="/profile">Profile</Link>
            //         <Link style= {linkStyles} data-cy="gigs" to="/gigs">Gigs</Link>
            //         <Link style= {linkStyles} data-cy="addGig" to="/gigs/new">Add a Gig</Link>
            //         <Link style={linkStyles} data-cy="logout" to="/" onClick={handleLogout}>Logout</Link>
            //     </div> 
            // )
            // : ( 
            //     <div>
            //         <Link style={linkStyles} data-cy="register" to="/auth/register">Register</Link>
            //         <Link style={linkStyles} data-cy="login" to="/auth/login">Login</Link>
            //     </div> 
            // ) 
            // }
        //     <Link style={linkStyles} data-cy="home" to="/">Home</Link>
        //     <Link style={linkStyles} to="/about">About</Link>
        //     </div>
    )
}

export default Navi