import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from './components/PrivateRoute';

// contexts
import { PlantsContext } from './contexts';

// components
import Login from './components/Login';
import Register from './components/Register';
import Plants from './components/Plants';
import Edit from './components/Edit';
import CreatePlant from './components/CreatePlant';
import CreateSpecies from './components/CreateSpecies';
import Species from './components/Species';
import Header from './components/visual/Header';
import UserCP from './components/UserCP';
import Species from './components/Species';

function App() {

  const [plants, setPlants] = useState([]);
  const [species, setSpecies] = useState([]);

  return (
    <Container>
      <PlantsContext.Provider value={{ plants, setPlants, species, setSpecies }}>
        <Header />
        <div className="main-content">
          {/* Unauthenticated routes */}
          <Switch>
            {/* Was trying to redirect authenticated users to plants dashboard if they navigate to /login or /register while logged in */}
            {localStorage.getItem('token') && <Route path="/login" render={() => <Redirect to="/plants" />} />}
            {localStorage.getItem('token') && <Route path="/register" render={() => <Redirect to="/plants" />} />}

            <Route path="/login" component={Login} />
            <Route exact path="/" component={Register} />
            <Route path="/register" component={Register} />

            {/* Private Routes for authenticated users */}
            <PrivateRoute path="/usercp" component={UserCP} />
            <PrivateRoute exact path="/plants" component={Plants} />
            <PrivateRoute exact path="/plants/:id" render={props => <Edit {...props} plants={plants} />} />
            <PrivateRoute path="/create" component={CreatePlant} />
            <PrivateRoute path="/create-species" component={CreateSpecies} />
            <PrivateRoute path="/species" component={Species} />
          </Switch>
        </div>
      </PlantsContext.Provider>
    </Container>
  );
}

// styling for entire app container
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* main content container (the gray background) */
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    padding: 3%;
    width: 80%;
    background: #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 #000;
    margin-bottom: 5rem;

    @media (max-width: 800px) {
      width: 95%;
      padding: 7%;
    }
  }
`;

export default App;
