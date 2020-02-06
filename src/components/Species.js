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
                      <DivS key={speciesitem.id} className = "card">
                          <h3>{speciesitem.common_name}</h3>
                          <img src={Ficus} alt="plant icon" />
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
        border-bottom-length: 150px;
        color: #2b2b2b;
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
      
p {
        font-size: 1.6rem;
        font-weight: 500;
        margin: 2rem 0;
        color: #2b2b2b;
        align-content: center;
}
`


export default Species;