import api from '../config/api'

export function getEventFromId(gigs,id) {
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

// Deletes a post on the server
export async function deleteEvent(id) {
    const response = await api.delete(`/events/${id}`)
    return response.data
}

export async function updateEvent(event) {
    const response = await api.put(`/events/${event._id}`, event)
    return response.data
}