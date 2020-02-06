import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// contexts
import { PlantsContext } from '../contexts';

// assets
import Start from '../assets/Start.svg';

function CreateSpecies(props) {

    const { species, setSpecies } = useContext(PlantsContext);

    let history = useHistory();

    const [newSpecies, setNewSpecies] = useState({
        common_name: '',
        scientific_name: '',
        h2o_frequency: '',
        image_url: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setNewSpecies({
            ...newSpecies,
            [e.target.name]: e.target.value
        });
    }

    const createSpecies = (newSpecies) => {
        setIsLoading(true);

        if (newSpecies.common_name === '' ||
            newSpecies.scientific_name === '' ||
            newSpecies.h2o_frequency === '') {
            setError(`You must enter in a common name, scientific name, and H2O frequency to proceed.`);
            setIsLoading(false);
            return;
        }
        else if (newSpecies.common_name.match(/[^a-z0-9]/gi, '')) {
            setError('Please enter a valid common species name.');
            setIsLoading(false);
            return;
        }
        else if (newSpecies.scientific_name.match(/[^a-z0-9]/gi, '')) {
            setError('Please enter a valid scientific name.');
            setIsLoading(false);
            return;
        }
        else if (newSpecies.h2o_frequency.match(/[^a-z0-9]/gi, '')) {
            setError('Please enter a valid H2O frequency.');
            setIsLoading(false);
            return;
        }
        else if (newSpecies.common_name < 4 || newSpecies.common_name >= 32) {
            setError('Please enter a valid common species name between 4 and 32 characters.');
            setIsLoading(false);
            return;
        }
        else if (newSpecies.scientific_name < 4 || newSpecies.scientific_name >= 32) {
            setError('Please enter a valid scientific species name between 4 and 32 characters.');
            setIsLoading(false);
            return;
        }
        // else if (newSpecies.h2o_frequency !== 1 || newSpecies.h2o_frequency !== 2 || newSpecies.h2o_frequency !== 3) {
        //     setError('H2O frequency should either be 1, 2, or 3.');
        //     return;
        // }
        else if (newSpecies.h2o_frequency.match(/[^1-3]/gi, '')) {
            setError('H2O frequency should be 1, 2, or 3.');
            setIsLoading(false);
            return;
        }

        axiosWithAuth().post(`/plants/species`, newSpecies)
            .then((res) => {
                console.log(res);
                setSpecies({
                    ...species,
                    newSpecies
                });
                setIsLoading(false);
                history.push(`/plants`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            <div className="banner">
                <img src={Start} alt="Create a species" />
            </div>
            <div className="start-info">
                <h3>Create a Species</h3>
                <p>Every plant you create must have a species. Create your species below.</p>
                <ol>
                    <li>Give it its common name.</li>
                    <li>Give it its scientific name.</li>
                    <li>Designate its H2O frequency (1-3) for how many times to water it per day</li>
                    <li>Enter in an optional image URL.</li>
                </ol>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createSpecies(newSpecies);
            }}>
                <input
                    type="text"
                    name="common_name"
                    placeholder="Common Name"
                    value={newSpecies.common_name}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="scientific_name"
                    placeholder="Scientific Name"
                    value={newSpecies.scientific_name}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="number"
                    name="h2o_frequency"
                    placeholder="H2O Frequency"
                    value={newSpecies.h2o_frequency}
                    onChange={handleChange}
                    autoComplete="off"
                    min="1"
                    max="3"
                />
                <input
                    type="url"
                    name="image_url"
                    placeholder="Image URL"
                    value={newSpecies.image_url}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {!isLoading && <button type="submit">Create Species</button>}
                {isLoading && <button type="submit">Creating...</button>}
                {error && <p>{error}</p>}
            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .banner {
        width: 50%;
        margin-bottom: 5%;

        img {
            width: 100%;
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

    .start-info {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;

        @media (max-width: 1050px) {
            width: 100%;
            margin-top: 10%;
        }

        h3 {
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: 0.1rem;
            color: #444444;
            margin-bottom: 1rem;
        }

        p {
            margin: 1rem 0;
            font-size: 2rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #444444;
            padding-bottom: 1.5rem;
            border-bottom: 1px dotted #444444;

            @media (max-width: 700px) {
                width: 100%;
                text-align: justify;
                padding: 0 1rem 2.5rem;
            }
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
`;

export default CreateSpecies;