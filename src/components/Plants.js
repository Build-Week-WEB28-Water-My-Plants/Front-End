import React, { useContext, useEffect, useReducer } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
// import PrivateRoute from '../components/PrivateRoute';

// contexts
import { PlantsContext } from '../contexts';
// import { UserContext } from '../contexts';

// components
import Plant from './Plant';
// import Edit from './Edit';

function Plants(props) {

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
            {console.log(`was this success?`, plants, species)}
            <h3>Welcome to your Plant Dashboard, {localStorage.getItem('username')}.</h3>
            <p className="welcome">You can create new plants from here, as well as update existing plants, or set your reminder to water.</p>
            {/* {console.log(plants)} */}
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
    
    @media (max-width: 575px) {
                display: flex;
            flex-direction: column;
            align-items: center;
        }
    
    h3 {
                font - size: 2.5rem;
            font-weight: 700;
            letter-spacing: 0.1rem;
            padding-bottom: 1rem;
            border-bottom: 1px dotted #444444;
    
        @media (max-width: 575px) {
                font - size: 2rem;
            text-align: center;
        }
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
    `;

export default Plants;