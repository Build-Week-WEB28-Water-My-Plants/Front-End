import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header(props) {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = !!localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        }
    }, []);

    return (
        <Container>
            <h1>PlantWise</h1>

            <nav className="user-cp">
                {!localStorage.getItem('token') &&
                    <Link to="/register">Register</Link>}
                {!localStorage.getItem('token') &&
                    <Link to="/login">Login</Link>}
                {localStorage.getItem('token') &&
                    <Link to="/plants">Dashboard</Link>}
                {localStorage.getItem('token') &&
                    <span className="user-cp" onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>Logout</span>}

                {console.log(isLogged)}
            </nav>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    height: 5rem;
    background: #d1ffd6;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    /* navigation / user cp styling */
    nav.user-cp {
        display: flex;
        justify-content: flex-end;
        width: 75%;
        margin-right: 15%;
        letter-spacing: 0.1rem;

        @media (max-width: 660px) {
            width: 100%;
            justify-content: center;
            margin-right: 0;
        }

        a {
            color: #444444;
            text-decoration: none;
            font-size: 1.4rem;
            transition: all 300ms;
            padding: 0 3rem;
            
            &:hover {
                transition: color 300ms;
                color: #000;
            }

            &:last-child {
                padding-right: 0;
            }

            @media (max-width: 660px) {
                &:first-child {
                    padding-left: 0;
                }
            }
        }
    }

    /* more user control panel styling */
    .user-cp {
        span {
            color: #444444;
            text-decoration: none;
            font-size: 1.4rem;
            transition: all 300ms;
            padding: 0 3rem;

            &:hover {
                transition: color 300ms;
                color: #000;
                cursor: pointer;
            }
        }
    }

    h1 {
        color: #444444;
        font-weight: 600;
        font-size: 2rem;
        margin-left: 15%;
        width: 25%;

        @media (max-width: 480px) {
            display: none;
        }
    }
`;

export default Header;