import api from '../config/api'

export function getEvent(gigs,id) {
    const event =  gigs.find((event) =>  event._id === id)
    console.log(event)
    return event
}

export async function getEvents() {
    const response = await api.get("/events")
    return response.data
}

export async function postEvent(newGig) {
    const response = await api.post("/events", newGig)
    return response.data
}

// Deletes a post on the server
export async function removeEvent(id) {
    const response = await api.delete(`/events/${id}`)
    return response.data
}

export async function modifyEvent(event) {
    const response = await api.put(`/events/${event._id}`, event)
    return response.data
}

export async function applyToEvent(event) {
    const response = await api.put(`/events/${event._id}/apply`, event)
    console.log(response.data)
    return response.data
}

export async function selectRandomUsers(event) {
    const response = await api.put(`/events/${event._id}/select`, event)
    console.log(response.data)
    return response.data
}
