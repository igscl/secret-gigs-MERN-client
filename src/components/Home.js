import React from 'react'
import { Container } from "reactstrap";
import '../assets/css/styles.css'


const Home = () => {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          // backgroundImage:
            // "url(" + require("assets/img/antoine-barres.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Secret Gigs</h1>
              <div className="fog-low">
                <img alt="..." src={require("../assets/img/fog-low.png")} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={require("../assets/img/fog-low.png")} />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("../assets/img/clouds.png") + ")",
          }}
        />

      </div>
    </>
  )
}

export default Home
