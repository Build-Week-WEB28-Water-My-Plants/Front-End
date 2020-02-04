import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

// contexts
import { PlantsContext } from '../contexts';
import { UserContext } from '../contexts';

// components
import Plant from './Plant';

function Plants(props) {

    const { plants, setPlants } = useContext(PlantsContext);
    const { user, setUser } = useContext(UserContext);

    // grab our id so we can render the specific user data
    const id = localStorage.getItem('id');

    useEffect(() => {
        // console.log(user);
        axiosWithAuth().get(`/plants/user/${id}`)
            .then((res) => {
                // console.log(res);
                setPlants(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, []);

    // useEffect(() => {
    //     axiosWithAuth().get(`/plants/species/3`)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // })

    return (
        <Container>
            <h3>Welcome to your Plant Dashboard.</h3>
            <p className="welcome">You can create new plants from here, as well as update existing plants, or set your reminder to water.</p>
            {
                plants.map((plant, idx) => {
                    return (
                        <Plant key={idx} plant={plant} />
                    )
                })
            }
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
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;

        @media (max-width: 575px) {
            font-size: 2rem;
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