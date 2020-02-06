import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { PlantsContext } from '../contexts';

// assets
import PlantAvatar from '../assets/PlantAvatar.svg';
import Water from '../assets/Water.svg';
import Drop from '../assets/Drop.svg';
import Drops from '../assets/Drops.svg';
import Dropss from '../assets/Dropss.svg';

function Plant(props) {

    let history = useHistory();

    const { setPlants } = useContext(PlantsContext);
    const { plant } = props;
    const uid = Number(localStorage.getItem('id'));
    const species = JSON.parse(localStorage.getItem('species'));
    const filteredSpecies = species.map((x => x));
    const filtered = filteredSpecies.filter(sp => sp.common_name === plant.common_name);

    console.log(`our new filtered species`, filteredSpecies);
    console.log(`please let this work`, filtered);

    const [edit, setEdit] = useState(false);
    const [err, setErr] = useState('');
    const [plantToEdit, setPlantToEdit] = useState({
        nickname: plant.nickname,
        location: plant.location,
        user_id: uid
    });

    const [speciesToEdit, setSpeciesToEdit] = useState({
        common_name: '',
        scientific_name: '',
        h2o_frequency: ''
    });

    const handleChange = (e) => {
        setPlantToEdit({
            ...plantToEdit,
            [e.target.name]: e.target.value
        });
    }

    const speciesChange = (e) => {
        setSpeciesToEdit({
            ...speciesToEdit,
            [e.target.name]: e.target.value
        });
    }

    const [toggle, setToggle] = useState(false);

    const deletePlant = (id) => {
        axiosWithAuth().delete(`/plants/${id}`)
            .then((res) => {
                console.log(res);
                axiosWithAuth().get(`/plants/user/${uid}`)
                    .then((res) => {
                        console.log(res);
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
        axiosWithAuth().put(`/plants/${id}`, plantToEdit)
            .then((res) => {
                console.log(res);
                setPlants(res.data);
                history.push(`/plants`);
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editSpecies = (id) => {

        if (speciesToEdit.common_name === '' ||
            speciesToEdit.scientific_name === '' ||
            speciesToEdit.h2o_frequency === '') {
            setErr('Please make sure to enter in a common name, scientific name, and H2O frequency.')
            return;
        }

        axiosWithAuth().put(`/plants/species/${id}`, speciesToEdit)
            .then((res) => {
                // console.log(res);
                axiosWithAuth().get(`/plants/user/${uid}`)
                    .then((res) => {
                        console.log(res);
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

    return (
        <Card key={props.idx}>
            {/* {console.log(species)} */}
            <div className="plant-info">
                {/* {console.log(plant)} */}
                <p>Nickname: {!edit ? (<span>{plant.nickname}</span>) : <input
                    type="text"
                    name="nickname"
                    value={plantToEdit.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                />}</p>
                <p>Location: {!edit ? (<span>{plant.location}</span>) : <input
                    type="text"
                    name="location"
                    value={plantToEdit.location}
                    onChange={handleChange}
                    autoComplete="off"
                />}</p>

                {/* make toggleable */}
                {/* {console.log(`THIS IS OUR PLANT`, plant)} */}
                {toggle === true && <div className="more-info">
                    {/* <p>Common Species Name: {plant.common_name}</p> */}
                    <p>Common Species Name: {!edit ? (<span>{plant.common_name}</span>) : (
                        <input
                            type="text"
                            name="common_name"
                            value={speciesToEdit.common_name}
                            onChange={speciesChange}
                            autoComplete="off"
                        />
                    )}</p>
                    {/* <p>Scientific Name: {plant.scientific_name}</p> */}
                    <p>Scientific Name: {!edit ? (<span>{plant.scientific_name}</span>) : (
                        <input
                            type="text"
                            name="scientific_name"
                            value={speciesToEdit.scientific_name}
                            onChange={speciesChange}
                            autoComplete="off"
                        />
                    )}</p>
                    {/* <p>H2O Frequency: {filtered[0].h2o_frequency}</p> */}
                    {!edit && <div className="droplets">
                        <div>
                            <h4>H2O / day</h4>
                            {filtered[0].h2o_frequency === 1 &&
                                <img src={Drop} alt="Droplet" />}
                            {filtered[0].h2o_frequency === 2 &&
                                <img src={Drops} alt="Droplet x2" />}
                            {filtered[0].h2o_frequency === 3 &&
                                <img src={Dropss} alt="Droplet x3" />}
                        </div>
                    </div>}
                    {edit && <p><span>H2O Frequency:</span> <input
                        type="number"
                        name="h2o_frequency"
                        min="1"
                        max="3"
                        value={speciesToEdit.h2o_frequency}
                        onChange={speciesChange}
                        autoComplete="off"
                    /></p>}

                    {/* {edit && <select name="species-id">
                        {species.map((x, idx) => {
                            return <option key={idx} value={x.id}>{x.common_name}</option>
                        })}
                    </select>} */}
                    {edit && <button className="confirm-edit" onClick={(e) => {
                        e.preventDefault();
                        editPlant(plant.id);
                        editSpecies(filtered[0].id);
                        setEdit(!edit);
                    }}>Finish Editing</button>}
                    <div className="plant-controls">

                        {/* removing until we need to use */}
                        {/* <div className="water-btn">
                            <img src={Water} alt="Water Your Plant" />
                            <span>Water</span>
                        </div> */}

                        <button onClick={() => setEdit(!edit)}>Edit Plant</button>
                        <button className="delete" onClick={(e) => {
                            e.preventDefault();
                            deletePlant(plant.id);
                        }}>Delete Plant</button>
                        {toggle === true && <div className="collapse" onClick={() => setToggle(!toggle)}>Collapse information...</div>}
                    </div>
                </div>}
                {toggle === false && <div className="view-more" onClick={() => setToggle(!toggle)}>View more information...</div>}
            </div>

            <div className="plant-avatar">
                {/* <img src={PlantAvatar} alt={plant.nickname} /> */}
                {/* {matchSpecies.image_url !== '' ? (
                    <img src={matchSpecies[0].image_url} alt={plant.nickname} />
                ) : (
                        <img src={PlantAvatar} alt="plant.nickname" />
                    )} */}
                {filtered[0].image_url && <img src={filtered[0].image_url} alt="Species Image" />}
                {!filtered[0].image_url && <img src={PlantAvatar} alt="Species Image" />}
                {/* <img src={PlantAvatar} alt="Default plant avatar" /> */}
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
                width: 60rem;
                margin-top: 5rem;
                display: flex;
                justify-content: space-evenly;
                align-items: center;

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
                    width: 100%;
                    height: 15rem;
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
                    box-shadow: 0px 2px 5px -5px;
    
                    &:hover {
                        transition: opacity 300ms;
                        opacity: 0.9;
                        cursor: pointer;
                    }

                    @media (max-width: 720px) {
                        margin: 1rem 0;
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
                    box-shadow: 0px 2px 5px -5px;

                    @media (max-width: 720px) {
                        margin: 1rem 0;
                    }

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
            object-fit: contain;
        }

        @media (max-width: 1080px) {
            width: 70%;
        }

        @media (max-width: 720px) {
            width: 100%;
        }
    }

    .view-more, .collapse {
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20rem;
        height: 3rem;
        border-radius: 0.3rem;
        background: #d1ffd6;
        color: #444444;
        font-weight: 300;
        letter-spacing: 0.1rem;
        transition: all 300ms;
        font-size: 1.6rem;

        &:hover {
            transition: opacity 300ms;
            opacity: 0.8;
            cursor: pointer;
        }

        .icon {
            width: 25%;

            img {
                width: 100%;
            }
        }
    }

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

    .droplets {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        margin: 5% 0;

        @media (max-width: 1200px) {
            width: 100%;
        }

        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            h4 {
                text-align: center;
                font-size: 5rem;
                font-weight: 900;
                color: #fafafa;

                @media (max-width: 800px) {
                    font-size: 3rem;
                }
            }

            p {
                text-align: center;
                margin-bottom: 1rem;
            }

            img {
                margin-top: 2rem;
                width: 100%;
                height: 5rem;
            }
        }
    }

    button.confirm-edit {
            background: #d1e3ff;
            border: none;
            border-radius: 0.3rem;
            width: 12rem;
            height: 3rem;
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            transition: all 300ms;
            box-shadow: 0px 2px 5px -5px;
            margin-top: 2rem;

            &:hover {
                transition: opacity 300ms;
                opacity: 0.9;
                cursor: pointer;
    }
`;

export default Plant;