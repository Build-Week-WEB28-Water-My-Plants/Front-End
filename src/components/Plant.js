import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { PlantsContext } from '../contexts';

// assets
// import PlantAvatar from '../assets/PlantAvatar.svg';
import Water from '../assets/Water.svg';

function Plant(props) {

    // const { id } = useParams();

    const { setPlants } = useContext(PlantsContext);
    const { plant } = props;

    // const plantToEdit = plants.find((plant) => `${plant.id}` === id);

    const [toggle, setToggle] = useState(false);

    let history = useHistory();
    const uid = localStorage.getItem('id');

    const deletePlant = (id) => {
        axiosWithAuth().delete(`/plants/${id}`)
            .then((res) => {
                // console.log(res);
                axiosWithAuth().get(`/plants/${uid}`)
                    .then((res) => {
                        // console.log(res);
                        setPlants(res.data);
                        history.push(`/plants`);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editPlant = (id) => {
        history.push(`/plants/${id}`);
    }

    return (
        <Card key={props.idx}>
            <div className="plant-info">
                {/* {console.log(plant)} */}
                <p>Nickname: {plant.nickname}</p>
                <p>Location: {plant.location}</p>

                {/* make toggleable */}
                {toggle === true && <div className="more-info">
                    <p>Common Species Name: {plant.common_name}</p>
                    <p>Scientific Species Name: {plant.scientific_name}</p>
                    <p>H2O Frequency: {plant.h2o_frequency}</p>
                    <p onClick={() => { history.push(`/plants/${plant.id}`) }}>View More Info...</p>
                    <div className="plant-controls">
                        <div className="water-btn">
                            <img src={Water} alt="Water Your Plant" />
                            <span>Water</span>
                        </div>
                        <button onClick={() => editPlant(plant.id)}>Edit Plant</button>
                        <button className="delete" onClick={() => {
                            deletePlant(plant.id);
                        }}>Delete Plant</button>
                        {toggle === true && <p onClick={() => setToggle(!toggle)}>Collapse information...</p>}
                    </div>
                </div>}
                {toggle === false && <p onClick={() => setToggle(!toggle)}>View more information...</p>}
            </div>

            <div className="plant-avatar">
                {plant.image_url && <img src={plant.image_url} alt={plant.nickname} />}
            </div>
        </Card>
    )
}

const Card = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0;
    padding: 2rem;
    background: #444444;
    border-radius: 0.3rem;

    @media (max-width: 720px) {
        flex-direction: column-reverse;
        width: 100%;
        align-items: center;
    }

        .plant-info {
            width: 60%;

            @media (max-width: 720px) {
                margin-top: 5%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            p {
                font-size: 1.6rem;
                font-weight: 300;
                color: #fafafa;
                letter-spacing: 0.1rem;
                line-height: 3.2rem;
            }
    
            .plant-controls {
                width: 45rem;
                margin-top: 5rem;
                display: flex;
                justify-content: space-evenly;
                // border: 1px solid red;

                @media (max-width: 1080px) {
                    flex-direction: column;
                    align-items: flex-start;
                    margin-top: 1rem;
                    justify-content: space-evenly;
                    width: 20rem;
                    height: 15rem;
                }

                @media (max-width: 720px) {
                    align-items: center;
                }
                
                button {
                    background: #d1ffd6;
                    border: none;
                    border-radius: 0.3rem;
                    width: 12rem;
                    height: 3rem;
                    font-size: 1.4rem;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                    transition: all 300ms;
    
                    &:hover {
                        transition: opacity 300ms;
                        opacity: 0.9;
                        cursor: pointer;
                    }
                }
    
                button.delete {
                    background: #e3443d;
                }

                .water-btn {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    background: #1a1a1a;
                    width: 12rem;
                    font-size: 1.6rem;
                    letter-spacing: 0.1rem;
                    color: #48B3EF;
                    border-radius: 0.3rem;
                    transition: all 300ms;
                    height: 3rem;

                    &:hover {
                        transition: opacity 300ms;
                        opacity: 0.8;
                        cursor: pointer;
                    }

                    img {
                        height: 2rem;
                        width: 20%;
                    }

                    span {
                        display: flex;
                        justify-content: center;
                        width: 60%;
                    }
                }
            }
        }

    .plant-avatar {
        display: flex;
        width: 30%;

        @media (max-width: 1080px) {
            align-items: center;
        }

        img {
            width: 100%;
            height: 20rem;
            object-fit: cover;
        }

        @media (max-width: 1080px) {
            width: 70%;
        }

        @media (max-width: 720px) {
            width: 100%;
        }
    }
`;

export default Plant;