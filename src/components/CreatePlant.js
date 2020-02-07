import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory, Link } from 'react-router-dom';

// assets
import Paint from '../assets/Paint.svg';

function CreatePlant(props) {

    let history = useHistory();
    const uid = localStorage.getItem('id');
    const [newPlant, setNewPlant] = useState({
        nickname: '',
        species_id: Number(null),
        location: '',
        user_id: uid
    });

    const [err, setErr] = useState('');
    const species = JSON.parse(localStorage.getItem('species'));

    const handleChange = (e) => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value
        });
    }

    const createPlant = (newPlant) => {

        if (newPlant.species_id === 0) {
            setErr('You must select a species.');
            return;
        }
        else if (newPlant.nickname === '' || newPlant.location === '') {
            setErr('Please fill out both fields.');
            return;
        }
        else if (newPlant.nickname.match(/[^a-z0-9 ]/gi, '')) {
            setErr(`Your plant's name can only contain letters and numbers.`);
            return;
        }
        else if (newPlant.location.match(/[^a-z0-9 ]/gi, '')) {
            setErr(`Your plant's location can only contain letters and numbers.`);
            return;
        }
        else if (newPlant.nickname.length < 3 || newPlant.location.length < 3) {
            setErr(`Your plant's nickname and location must both be at least 3 letters.`);
            return;
        }
        else if (newPlant.nickname.length >= 32 || newPlant.location.length >= 32) {
            setErr(`Your plant's nickname or location cannot be more than 32 letters.`);
            return;
        }

        axiosWithAuth().post(`/plants`, newPlant)
            .then((res) => {
                console.log(res);
                history.push(`/plants`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            <div className="start">
                <div className="start-img">
                    <img src={Paint} alt="Start creating a plant" />
                </div>
                <div className="start-info">
                    <h3>Create Your Plant</h3>
                    <p>Creating a plant is easy.</p>
                    <ol>
                        <li>Give it a nickname</li>
                        <li>Tell us where it's located in your home</li>
                        <li>Identify its species</li>
                    </ol>
                    <p className="note">Note: If there are no species, you'll need to <Link to="/create-species">create one</Link></p>
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createPlant(newPlant);
            }}>
                <input
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    value={newPlant.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newPlant.location}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <select name="species_id" onChange={handleChange}>
                    <option selected disabled>Select a Species</option>
                    {
                        species.map((x, idx) => {
                            // { console.log(x.id) }
                            return <option key={idx} value={x.id}>{x.common_name}</option>
                        })
                    }
                </select>
                <button type="submit">Create Plant</button>
            </form>
            {err && <p className="error">{err}</p>}
        </Container>
    )
}

const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;

        .error {
            margin-top: 2rem;
            width: 100%;
            text-align: center;
            color: red;
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
        }

        .note {
            a {
                color: #d1ffd6;
                font-weight: 900;
                text-decoration: none;
                padding-bottom: 0.5rem;
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

    .start {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 5%;

        @media (max-width: 1050px) {
            flex-direction: column;
        }

        .start-img {
            width: 40%;

            @media (max-width: 1050px) {
                width: 100%;
            }

            img {
                width: 100%;
            }
        }

        .start-info {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;

            @media (max-width: 1050px) {
                width: 100%;
                margin-top: 10%;
            }

            h3 {
                font-size: 3rem;
                font-weight: 700;
                letter-spacing: 0.1rem;
                color: #444444;
            }

            p {
                margin: 1rem 0;
                font-size: 2rem;
                font-weight: 300;
                letter-spacing: 0.1rem;
                color: #444444;
                padding-bottom: 1.5rem;
                border-bottom: 1px dotted #444444;
            }

            ol {
                color: #444444;
                font-size: 1.6rem;
                letter-spacing: 0.1rem;
                font-weight: 300;
                margin-top: 1rem;

                li {
                    margin: 2rem 0;
                    border-bottom: 1px dashed #444444;
                    padding-bottom: 1.5rem;
                }
            }

        }
    }
`;

export default CreatePlant;