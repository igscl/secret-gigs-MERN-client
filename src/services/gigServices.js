import api from '../config/api'

export async function getEventFromId(gigs,id) {
  
    const event =  gigs.find((event) =>  event._id === id)
    console.log(event)
    return event
}

export async function getAllEvents() {
    const response = await api.get("/events")
    return response.data
}

export async function addEvent(newGig) {
    const response = await api.post("/events", newGig)
    return response.data
}