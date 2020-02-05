import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: `https://water-my-plants-1.herokuapp.com/api`,
        headers: {
            token: localStorage.getItem('token')
        }
    });
};