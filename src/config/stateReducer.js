  
export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case 'setAdmin':
			return {
				...state,
				adminUser: action.data,
			};
        case "setGigs": {
            return {
                ...state,
                gigs: action.data
            }
        }
        case "addGig":
            return {
                ...state,
                gigs: action.data
            }
        case "updateGig":
            return {
                ...state,
                gigs: action.data
            }
        case "deleteGig":
            const otherGigs = state.gigs.filter((gig) => gig._id !== parseInt(action.data))
            return {
                ...state,
                gigs: otherGigs
            }
        default: 
            return state
    }
}