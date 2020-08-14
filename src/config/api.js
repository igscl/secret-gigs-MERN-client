import axios from 'axios';

const deployedServer = "https://secret-gigs.herokuapp.com"


//create an axios instance 
export default axios.create(
    {
        baseURL: /*deployedServer ||*/ 'http://localhost:3003',
        timeout: 5000,
        withCredentials: true

    })