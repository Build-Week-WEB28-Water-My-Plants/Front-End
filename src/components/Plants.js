import React, { useContext, useEffect, useReducer } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// contexts
import { PlantsContext } from '../contexts';
// import { UserContext } from '../contexts';

// components
import Plant from './Plant';

function Plants(props) {

    let history = useHistory();

    const { plants, species, setPlants, setSpecies } = useContext(PlantsContext);

    // define our initial state
    const initialState = {
        isLogged: !!localStorage.getItem('token'),
        isLoading: false,
        error: '',
        user: {
            id: Number(localStorage.getItem('id'))
        },
        plants: [],
        species: []
    }

    // reducer to handle user actions with plants
    function plantReducer(state, action) {
        switch (action.type) {
            case 'GET_PLANTS':
                return {
                    ...state,
                    isLoading: true
                }
            case 'GOT_PLANTS':
                // console.log(`hello from got plants`, action.payload);
                return {
                    ...state,
                    isLoading: false,
                    plants: action.payload
                }
            case 'GET_SPECIES':
                // console.log(`hello we are getting the species`);
                return {
                    ...state,
                    isLoading: true,
                    species: []
                }
            case 'GOT_SPECIES':
                // console.log(`congrats, we got our species successfully`);
                return {
                    ...state,
                    isLoading: false,
                    species: action.payload
                }
            default:
                return state;
        }
    }

    // using the useReducer hook with our initial state
    const [state, dispatch] = useReducer(plantReducer, initialState);

    // whenever our user id changes or plants changes, run
    useEffect(() => {
        dispatch({ type: 'GET_PLANTS' }); // begin our GET request

        // authenticated GET to retrieve plants owned by the logged in user
        axiosWithAuth().get(`/plants/user/${state.user.id}`)
            .then((res) => {
                // console.log(res);
                const data = res.data;
                setPlants(res.data);
                localStorage.setItem('plants', JSON.stringify(data));

                // finish off our successful GET request and set our plants in state to our res
                dispatch({ type: 'GOT_PLANTS', payload: data });
            })
            .catch((err) => {
                // need to work on error handling
                console.log(err);
            })
    }, [state.user.id, setPlants]);

    // run this useEffect on component mount once
    useEffect(() => {
        dispatch({ type: 'GET_SPECIES' }); // begin our GET request

        // authenticated GET to retrieve all species on the server
        axiosWithAuth().get(`/plants/species`)
            .then((res) => {
                console.log(`our species:`, res);
                const data = res.data;
                setSpecies(data);
                localStorage.setItem('species', JSON.stringify(data));

                // finish off our successful GET request and set our species in state to our res
                dispatch({ type: 'GOT_SPECIES', payload: data });
            })
            .catch((err) => {
                // need to work on error handling
                console.log(err);
            })
    }, [setSpecies]);

    return (
        <Container>
            <UserControlPanel>
                <button onClick={(e) => {
                    e.preventDefault();
                    history.push(`/create-species`);
                }}>Create Species</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    history.push(`/create`);
                }}>Create Plant</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    history.push(`/usercp`);
                }}>Account Settings</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    history.push(`/species`);
                }}>View All Species</button>
            </UserControlPanel>
            {console.log(`was this success?`, plants, species)}
            <h3>Welcome to your Plant Dashboard, <span className="username">{localStorage.getItem('username')}</span>.</h3>
            <p className="welcome">You can create new plants from here, as well as update and delete existing plants you have already created.</p>
            {/* {console.log(plants)} */}
            {plants.length === 0 &&
                <div className="no-plants">
                    <h4>It looks like you don't have any plants yet!</h4>
                    <p>Creating your first plant is easy.</p>
                    <button onClick={() => history.push(`/create`)} className="no-plants-btn">Create My First Plant</button>
                </div>}
            {
                plants.map((plant, idx) => {
                    return (
                        <Plant key={idx} plant={plant} setPlants={setPlants} plants={plants} />
                    )
                })
            }
            {/* <PrivateRoute exact path="/plants/:id" render={props => <Edit {...props} plants={plants} />} /> */}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    color: #444444;

    h3 {
        margin-top: 5%;
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
    
        @media (max-width: 575px) {
            font-size: 2rem;
            text-align: center;
        }

        @media (max-width: 640px) {
            font-size: 1.8rem;
            text-align: center;
            line-height: 3rem;
        }
    }

    .username {
        color: #92a0b3;
        font-weight: 700;
    }
    
    @media (max-width: 575px) {
                display: flex;
            flex-direction: column;
            align-items: center;
        }
    


    p.welcome {
                margin: 3rem 0;
            padding: 1rem;
            font-size: 1.8rem;
    
        @media (max-width: 575px) {
            width: 100%;
            padding: 0;
            line-height: 2.5rem;
            font-size: 1.6rem;
            text-align: justify;
        }
    }

    img {
        width: 100%;
    }

    .no-plants {
        margin-top: 10%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        letter-spacing: 0.1rem;

        h4 {
            font-size: 3rem;
            font-weight: 300;

            @media (max-width: 1080px) {
                font-size: 2.4rem;
            }

            @media (max-width: 620px) {
                font-size: 2rem;
            }

            @media (max-width: 515px) {
                font-size: 1.8rem;
                width: 80%;
                text-align: center;
                line-height: 3rem;
            }
        }

        p {
            font-size: 2.4rem;
            font-weight: 300;
            margin: 2rem 0;

            @media (max-width: 1080px) {
                font-size: 1.8rem;
            }

            @media(max-width: 620px) {
                font-size: 1.6rem;
            }
        }

        button.no-plants-btn {
            margin-top: 3rem;
            background: #d1ffd6;
            border: none;
            border-radius: 0.3rem;
            width: 50rem;
            height: 8rem;
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: 0.1rem;
            transition: all 300ms;
            box-shadow: 0px 2px 5px -5px;
            color: #444444;

            @media (max-width: 1080px) {
                width: 35rem;
                height: 6rem;
                font-size: 2rem;
            }

            @media (max-width: 510px) {
                width: 25rem;
                height: 4rem;
                font-size: 1.6rem;
            }

            &:hover {
                transition: background 300ms;
                background: #f4fff6;
                cursor: pointer;
            }
        }
    }
    `;

const UserControlPanel = styled.div`
margin: 0 auto;
width: 70%;
display: flex;
height: 7rem;
align-items: center;
justify-content: space-evenly;

@media (max-width: 1208px) {
    width: 80%;
}

@media (max-width: 850px) {
    width: 80%;
}

@media (max-width: 1050px) {
    width: 90%;
}

@media (max-width: 930px) {
    flex-direction: column;
    height: 15rem;
}

button {
    background: #d1ffd6;
    border: none;
    border-radius: 0.3rem;
    width: 15rem;
    height: 3rem;
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
    transition: all 300ms;
    box-shadow: 0px 2px 5px -5px;
    color: #444444;

    &:hover {
        transition: background 300ms;
        background: #f4fff6;
        cursor: pointer;
    }
`;

export default Plants;