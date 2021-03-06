  
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
            return {
                ...state,
                gigs: action.data
            }
        case "applyGig":
            return {
                ...state,
                gigs: action.data
            }
        case "setLoggedInUserIsAdmin":
            return {
                ...state,
                loggedInUserIsAdmin: action.data
            }
        case "selectUsers":
            return{
                ...state,
                gigs: action.data
            }
        default: 
            return state
    }
}