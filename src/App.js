import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from './components/PrivateRoute';

// contexts
import { PlantsContext, UserContext } from './contexts';

// components
import Login from './components/Login';
import Register from './components/Register';
import Plants from './components/Plants';
import Edit from './components/Edit';
import CreatePlant from './components/CreatePlant';
import CreateSpecies from './components/CreateSpecies';
import Home from './components/Home';
import Header from './components/visual/Header';

function App() {

  // state for plants from server (shouldn't need once we have endpoints for users because plant state should then be in the user for their list of created and saved plants)
  const [plants, setPlants] = useState([]);

  // user state
  const [user, setUser] = useState({
    username: '',
    password: '',
    phone_number: ''
  });

  // loading state for loading messages - needs work
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <PlantsContext.Provider value={{ plants, setPlants }}>
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
          <Header />
          <div className="main-content">
            {/* Unauthenticated routes */}
            <Route exact path="/" component={Home} />
            {!localStorage.getItem('token') && <Route path="/login" component={Login} />}

            {/* Was trying to redirect authenticated users to plants dashboard if they navigate to /login or /register while logged in */}
            {localStorage.getItem('token') && <Route path="/login" render={() => <Redirect to="/plants" />} />}
            {localStorage.getItem('token') && <Route path="/register" render={() => <Redirect to="/plants" />} />}


            <Route path="/register" component={Register} />

            {/* Private Routes for authenticated users */}
            <PrivateRoute exact path="/plants" component={Plants} />
            <PrivateRoute path="/plants/:id" component={Edit} />
            <PrivateRoute path="/create" component={CreatePlant} />
            <PrivateRoute path="/create-species" component={CreateSpecies} />
          </div>
        </UserContext.Provider>
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
  }
`;

export default App;
