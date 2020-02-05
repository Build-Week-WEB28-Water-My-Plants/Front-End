// create our initial state object for our main reducer
const initialState = {
    isLoading: false,
    isLogged: false,
    error: '',
    success: '',
    user: {
        username: '',
        password: '',
        phone: '',
        token: null,
        id: null
    },
    plants: [],
    species: []
}

// our reducer takes in our state, or initialState if there is none, and an action
export const reducer = (state = initialState, action) => {

    // we have a switch to determine our action type and return state
    // based on what action gets dispatched
    switch (action.type) {
        // start login action
        case 'START_LOGIN':
            console.log(`hello from starting to login`);
            return {
                ...state,
                isLoading: true,
            }
        // login is successful and we receive a response back from the server
        case 'LOGIN_SUCCESS':
            console.log(`hello from successful login`);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.id);
            // if our login is a success, then we're no longer loading
            // and we are now logged in, with a token and user id 
            return {
                ...state,
                isLoading: false,
                isLogged: true,
                error: '',
                user: {
                    ...state,
                    token: action.payload.token,
                    id: action.payload.id
                }
            }
        // login fails for whatever reason, change error state
        // to display response back to the user
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                error: 'There was an error logging in.'
            }
        // if user decides to logout
        case 'LOGOUT':
            return {
                ...state,
                isLogged: false,
                error: '',

            }
        // default just returns state if there is no action
        default:
            return state;
    }
}