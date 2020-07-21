  
export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setGigs": {
            return {
                ...state,
                gigs: action.data
            }
        }
        case "addGig":
            return {
                ...state,
                gigs: [action.data, ...state.gigs]
            }
        case "updateGig":
            const otherGig = state.gigs.filter((gig) => gig._id !== parseInt(action.data._id))
            return {
                ...state,
                gigs: [...otherGig, action.data]
            }
        case "deleteGig":
            const updatedGig = state.gigs.filter((gig) => gig._id !== parseInt(action.data))
            return {
                ...state,
                gigs: updatedGig
            }
        default: 
            return state
    }
}