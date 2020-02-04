import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// contexts
import { PlantsContext } from '../contexts';

function Edit(props) {

    const uid = localStorage.getItem('id');
    let history = useHistory();
    const { plants } = props;
    const { id } = useParams();
    const { setPlants } = useContext(PlantsContext);

    const [plant, setPlant] = useState({
        id: id,
        nickname: '',
        location: '',
        user_id: uid
    });

    useEffect(() => {
        const plantToEdit = plants.find((plant) => `${plant.id}` === id);
        setPlant(plantToEdit);
    }, [plants, id]);


    const handleChange = (e) => {
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        });
    }

    const editPlant = (plant) => {
        // console.log(`plant id:`, toEdit.id);
        axiosWithAuth().put(`/plants/${id}`, plant)
            .then((res) => {
                console.log(res);
                // axiosWithAuth().get(`/plants/${uid}`)
                //     .then((res) => {
                //         setPlants(res.data);
                //         console.log(res);
                //         history.push(`/plants`);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            {console.log(plants)}
            {/* style later */}
            <div className="header">
                <h3>Edit Your Plant</h3>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                editPlant(plant);
            }}>
                <input
                    type="text"
                    name="nickname"
                    placeholder="New Plant Nickname"
                    value={plant.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="New Location"
                    value={plant.location}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {/* <select name="species">

                    </select> */}
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

    .header {
        width: 100%;
        background: #D1FFD6;

    }
`;

export default Edit;