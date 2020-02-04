import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// contexts
import { PlantsContext } from '../contexts';

function Species(props) {

    const { species, setSpecies } = useContext(PlantsContext);

    useEffect(() => {
        axiosWithAuth().get(`/plants/species/6`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    return (
        <>

        </>
    )
}

export default Species;