import React, { useContext, useState } from 'react';
import { PlantsContext } from '../contexts';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Edit(props) {

    let history = useHistory();
    const { id } = useParams();
    const { setPlants } = useContext(PlantsContext);

    const [toEdit, setToEdit] = useState({
        id: Number(id),
        nickname: '',
        species: '',
        h2oFrequency: '',
        image: ''
    });

    const handleChange = (e) => {
        setToEdit({
            ...toEdit,
            [e.target.name]: e.target.value
        });
    }

    const editPlant = (plant) => {
        axiosWithAuth().put(`/api/plants/${plant.id}`, toEdit)
            .then((res) => {
                axiosWithAuth().get(`/api/plants`)
                    .then((res) => {
                        setPlants(res.data);
                        // console.log(res);
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
        <Container>
            <form onSubmit={(e) => {
                e.preventDefault();
                editPlant(toEdit);
            }}>
                <input
                    type="text"
                    name="nickname"
                    placeholder="New Plant Nickname"
                    value={toEdit.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="species"
                    placeholder="New Species Name"
                    value={toEdit.species}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="number"
                    name="h2oFrequency"
                    placeholder="Water how many times per day?"
                    value={toEdit.h2oFrequency}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="New image URL"
                    value={toEdit.image}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="submit">Finish Editing</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
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
`;

export default Edit;