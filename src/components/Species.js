import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

// assets
import Ficus from '../assets/SpeciesIcon/Ficus.svg';

const Species = () => {
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get(`/plants/species`)
            .then(res => {
                console.log(res);
                setSpecies(res.data);
            })

            .catch((err) => {
                console.log(err);
            })
    }, []);

    //    const speciesIcon = [{
    //     photo:{Ficus},
    //     photo:{Orchid},
    //     photo:{PeaceLily}
    // }]

    //    class SpeciesIcon extends React.Component {
    //     render() {
    //         return (
    //             <div>
    //              {speciesIcon.map (e => 
    //                 <p>
    //                 icon={e.photo}

    //                 </p>
    //             )}
    //             </div>


    //         );
    //     }
    // }

    return (
        <SpeciesContainer>
            <div classname='species-list' >
                {species.map(speciesitem => {
                    return (
                        <DivS key={speciesitem.id} className="card">
                            {speciesitem.image_url ? (<div className="species-img"><img src={speciesitem.image_url} alt="Species Icon" /></div>) : (<div className="species-img"><img src={Ficus} alt="Default Species Avatar" /></div>)}
                            <h3>{speciesitem.common_name}</h3>
                            {/* Moved above and changed to display your icon if there's no working species image */}
                            {/* <img src={Ficus} alt="plant icon" /> */}
                            <p>Scientific Name: {speciesitem.scientific_name}</p>
                            <p> Water Frequency: {speciesitem.h2o_frequency}</p>

                        </DivS>

                    )
                })}
            </div>

        </SpeciesContainer>
    )
}

const SpeciesContainer = styled.div`
h3 {
        margin-top: 5%;
        
        font-size: 2.8rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
        border-bottom-length: 250px;
        color: #1e8b94;
        text-align: center;
        
}
img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
}
`

const DivS = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;

.species-img {
    width: 70%;
    height: 30rem;
    overflow: hidden;

    img {
        width: 100%;
        height: 30rem;
        object-fit: contain;
    }
}
`
      
p {
        font-size: 1.6rem;
        font-weight: 500;
        margin: 2rem 0 6rem 0;
        color: #2b2b2b;
        align-content: center;
        text-align: center;
        
}
`


export default Species;