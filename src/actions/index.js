import axios from 'axios';
import history from '../utils/history';

// login action
export const login = (user, redirect) => {
    return dispatch => {
        dispatch({ type: 'START_LOGIN' });
        axios.post(`https://water-my-plants-1.herokuapp.com/api/users/login`, user)
            .then((res) => {
                console.log(res);
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
                history.push(`/plants`);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

// logout action
export const logout = () => {
    return dispatch => {
        dispatch({ type: 'LOGOUT' });
    }
}