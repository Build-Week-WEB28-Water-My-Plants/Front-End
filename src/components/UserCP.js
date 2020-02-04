import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// contexts
// import { UserContext } from '../contexts';

// assets
import UserAvatar from '../assets/UserAvatar.svg';

function UserCP(props) {

    // const { user, setUser } = useContext(UserContext);
    const name = localStorage.getItem('username');
    const id = Number(localStorage.getItem('id'));

    const [updatedUser, setUpdatedUser] = useState({
        password: '',
        phone_number: ''
    })

    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    }

    const updateUsername = (user) => {
        axiosWithAuth().put(`/users/${id}`, user)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updatePassword = (user) => {
        axiosWithAuth().put(`/users/${id}`, user)
            .then((res) => {
                console.log(res);
                // setUser(updatedUser);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            <div className="user-card">
                <div className="card-avatar">
                    <img src={UserAvatar} alt="User Avatar" />
                </div>

                <div className="card-info">
                    <h3>Welcome back, <span className="strong">{name}</span></h3>
                    <p>What would you like to update?</p>
                </div>
            </div>

            <h4>Update Username:</h4>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateUsername(updatedUser);
            }}>
                <input
                    type="text"
                    name="phone_number"
                    placeholder="New Phone Number"
                    value={updatedUser.phone_number}
                    onChange={handleChange}
                />
                <button type="submit">Update Phone Number</button>
            </form>

            <h4>Update Password:</h4>
            <form onSubmit={(e) => {
                e.preventDefault();
                updatePassword(updatedUser);
            }}>
                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={updatedUser.password}
                    onChange={handleChange}
                />
                <button type="submit">Change Password</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 60%;

    h3 {
        font-size: 3rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
        color: 
    }

    h4 {
        margin: 5rem 0 2rem;
        font-size: 2.4rem;
        font-weight: 300;
        letter-spacing: 0.1rem;
        color: #444444;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
    }

    .user-card {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: #d1ffd6;
        width: 100%;
        padding: 1.5rem 1rem;
        border-radius: 0.3rem;
        letter-spacing: 0.1rem;
        color: #444444;
        box-shadow: 0px 2px 5px -5px;


        .card-avatar {
            width: 25%;

            img {
                width: 100%;
                object-fit: cover;
                border: 1px solid #444444;
                border-radius: 50%;
            }    
        }

        .card-info {
            width: 70%;
            padding-left: 1rem;

            h3{
                font-size: 1.8rem;
                font-weight: 300;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1.6rem;
                font-weight: 300;
            }

            .strong {
                font-weight: 700;
            }
        }
    }
        
    form {
            display: flex;
            flex-direction: column;
            align-items: center;
    
        input {
            margin: 1rem 0;
            width: 25rem;
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

        button {
                width: 20rem;
            height: 3.5rem;
            margin: 2rem 0 1rem;
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
}
`

export default UserCP;