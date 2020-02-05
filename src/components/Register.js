import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// assets
import Watering from '../assets/Watering.svg';

function Register(props) {

    let history = useHistory();

    // needs to be wired up to backend endpoint for registering users

    // state for new user to be created
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        phone_number: ''
    });

    // input change handler
    const handleChange = (e) => {

        // update new user state
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    const register = (newUser) => {
        axios.post(`https://water-my-plants-1.herokuapp.com/api/users/register`, newUser)
            .then((res) => {
                console.log(res);
                history.push(`/login`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>

            <div className="svg-banner">
                <img src={Watering} alt="Woman watering plants" />
            </div>

            <h3>Create a New Account</h3>

            {/* Register Form */}
            {/* <form onSubmit={(e) => {
                e.preventDefault();
                register(newUser);
            }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone #"
                    value={newUser.phone_number}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="submit" disabled>Register</button>
                <div className="extra-options">
                    <span onClick={() => history.push(`/login`)}>Already have an account? Login</span>
                </div>
            </form> */}

        </Container>
    )
}

const Container = styled.div`
    color: #444444;

    h3 {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
        margin-bottom: 5%;
        text-align: center;

        @media (max-width: 400px) {
            font-size: 2rem;
        }
    }

    /* SVG of woman watering plants */
    img {
        margin-bottom: 10%;
        height: 50rem;

        @media (max-width: 900px) {
            height: auto;
            width: 100%;
        }
    }

    /* Registration form styling */
    form {
        padding: 2.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        /* Input styling */
        input {
            margin: 0.5rem 0;
            width: 20rem;
            height: 3.5rem;
            background: #bfbfbf;
            border: none;
            border-radius: 0.3rem;
            padding: 0.5rem 0.5rem 0.5rem 1rem;
            font-size: 1.2rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
        
            &:focus {
                outline: none;
                border: 1px solid #ababab;
            }
        }
        
        /* Button Styling */
        button {
            width: 20rem;
            height: 3.5rem;
            margin: 1rem 0;
            background: #d1ffd6;
            border: none;
            border-radius: 0.3rem;
            transition: all 100ms;
            box-shadow: 0px 2px 5px -5px;
            letter-spacing: 0.1rem;
        
            &:hover {
                transition: background 100ms;
                cursor: pointer;
                background: #afdeb4;
            }
        }

        /* Login if already registered */
        .extra-options {
            margin: 1rem 0;
            width: 80%;
            display: flex;
            justify-content: center;

            span {
                color: #fafafa;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`;

export default Register;