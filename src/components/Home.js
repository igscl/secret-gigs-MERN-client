import React from 'react'


import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const Home = () => {

//   const styles = {
//     paperContainer: {
//         height: 1356,
//         backgroundImage: `url(${"static/src/img/main.jpg"})`
//     }
// };

  return (
    <Box bgcolor="#000">
      
      <Container fixed>
      <Typography component="div" style={{ backgroundColor: '#0000', height: '100vh' }} />
      </Container>
    </Box>
   
  )
}

export default Home
