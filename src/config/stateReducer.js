  
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
        case "updateGig":
            const otherGig = state.gigs.filter((gig) => gig._id !== parseInt(action.data._id))
            return {
                ...state,
                gigs: [...otherGig, action.data]
            }

        case "deleteGig":
            const otherGigs = state.gigs.filter((gig) => gig._id !== parseInt(action.data._id))
            return {
                ...state,
                gigs: otherGigs
            }
        default: 
            return state
    }
}