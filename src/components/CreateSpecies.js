import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function CreateSpecies(props) {

    const [newSpecies, setNewSpecies] = useState({
        common_name: '',
        scientific_name: '',
        h2o_frequency: 5
    });

    const handleChange = (e) => {
        setNewSpecies({
            ...newSpecies,
            [e.target.name]: e.target.value
        });
    }

    const createSpecies = (newSpecies) => {
        axiosWithAuth().post(`/plants/species`, newSpecies)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
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
            />
            {/* <input
                type="url"
                name="image_url"
                placeholder="Image URL"
                value={newSpecies.image_url}
                onChange={handleChange}
                autoComplete="off"
            /> */}
            <button type="submit">Create Species</button>
        </form>
    )
}

export default CreateSpecies;