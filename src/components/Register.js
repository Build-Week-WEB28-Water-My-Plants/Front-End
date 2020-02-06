import React, { useState, useReducer } from 'react';
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

    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    // input change handler
    const handleChange = (e) => {

        // update new user state
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    let cb = (user) => {
        if (newUser.username === "" ||
            newUser.password === "" ||
            newUser.phone_number === "") {
            setErrorText("Please fill out all fields!");
        }
        else if (newUser.username.length < 4 || newUser.username.length > 12) {
            setErrorText("Your username must be at least 4 characters, and no longer than 12.");
            return;
        }
        else if (newUser.username.match(/[^a-z0-9]/gi, '')) {
            setErrorText("Your username can only contain letters and numbers.");
            return;
        }
        else if (newUser.password.length < 4 || newUser.password.length >= 32) {
            setErrorText("Your password must be between 4 and 32 characters.")
            return;
        }
        else if (newUser.phone_number.match(/[^0-9]/gi, '') || newUser.phone_number.length !== 10) {
            setErrorText("Please enter a valid 10 digit phone number.");
            return;
        }

        axios.post("https://water-my-plants-1.herokuapp.com/api/users/register", user)
            .then((res) => {
                //response.data["id"]
                //response.data["username"]
                console.log(res);
                setNewUser({
                    username: '',
                    password: '',
                    phone_number: ''
                });
                setSuccessText('Success...');
                history.push(`/login`);
                // ((Should probably reset the newuser so the password gets deallocated from mem))
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // const register = (newUser) => {
    //     axios.post(`https://water-my-plants-1.herokuapp.com/api/users/register`, newUser)
    //         .then((res) => {
    //             console.log(res);
    //             history.push(`/login`);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    return (
        <Container>

            <div className="svg-banner">
                <img src={Watering} alt="Woman watering plants" />
            </div>

            <h3>Create a New Account</h3>

            {/* Register Form */}
            <form onSubmit={(e) => {
                e.preventDefault();
                // register(newUser);
                cb(newUser);
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
                <button type="submit">Register</button>
                <div className="extra-options">
                    <span onClick={() => history.push(`/login`)}>Already have an account? Login</span>
                </div>
                {errorText && <p>{errorText}</p>}
            </form>

        </Container >
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