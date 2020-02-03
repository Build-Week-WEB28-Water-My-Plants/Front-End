import React from 'react';
import styled from 'styled-components';

// assets
import CTA from '../assets/CTA.svg';

function Home(props) {
    return (
        <Container>
            {/* Call to Action */}
            <div className="cta">

                {/* Call to Action image */}
                <div className="cta-img">
                    <img src={CTA} alt="Plant in Hand" />
                </div>

                {/* Call to Action message */}
                <div className="cta-message">
                    <h4>Take Care of your Plants.</h4>
                    <p>Watering doesn't need to be a hassle.</p>
                    <div className="btns">
                        <button className="register" onClick={() => props.history.push(`/register`)}>Register</button>
                        <button onClick={() => props.history.push(`/login`)}>Login</button>
                    </div>
                </div>

            </div>

            {/* 3 column layout for information */}
            <div className="cols">

                <div className="col">
                    <h3>Never Forget To Water</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat libero vitae imperdiet mattis. Integer sagittis viverra magna non varius. In tincidunt lorem consectetur justo iaculis blandit at ut erat. Vivamus diam tellus, tincidunt eu maximus et, placerat at ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec tempor faucibus ligula, nec aliquam tortor malesuada ut. Aenean egestas ipsum eu tortor tristique vulputate. Aenean dictum massa leo, sed lacinia lacus tincidunt finibus. Nullam cursus in mauris vel tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>

                <div className="col">
                    <h3>Keep Your Plants Healthy</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat libero vitae imperdiet mattis. Integer sagittis viverra magna non varius. In tincidunt lorem consectetur justo iaculis blandit at ut erat. Vivamus diam tellus, tincidunt eu maximus et, placerat at ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec tempor faucibus ligula, nec aliquam tortor malesuada ut. Aenean egestas ipsum eu tortor tristique vulputate. Aenean dictum massa leo, sed lacinia lacus tincidunt finibus. Nullam cursus in mauris vel tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>

                <div className="col">
                    <h3>Learn About Plants</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat libero vitae imperdiet mattis. Integer sagittis viverra magna non varius. In tincidunt lorem consectetur justo iaculis blandit at ut erat. Vivamus diam tellus, tincidunt eu maximus et, placerat at ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec tempor faucibus ligula, nec aliquam tortor malesuada ut. Aenean egestas ipsum eu tortor tristique vulputate. Aenean dictum massa leo, sed lacinia lacus tincidunt finibus. Nullam cursus in mauris vel tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>

            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #444444;

    /* Call to Action section styling */
    .cta {
        padding: 0 5rem;
        margin-bottom: 10%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 1120px) {
            flex-direction: column;
        }

        /* Call to Action message styling */
        .cta-message {
            width: 35%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;

            @media (max-width: 1120px) {
                width: 100%;
                margin-top: 5rem;
            }

            h4 {
                font-size: 5rem;
                font-weight: 700;
                letter-spacing: 0.1rem;
                margin-bottom: 2rem;
                text-align: center;

                @media (max-width: 535px) {
                    font-size: 3.5rem;
                }

                @media (max-width: 422px) {
                    font-size: 3rem;
                }

                @media (max-width: 400px) {
                    font-size: 2.7rem;
                }
            }

            p {
                font-size: 2.4rem;
                font-weight: 300;
                letter-spacing: 0.1rem;
                text-align: center;

                @media (max-width: 535px) {
                    font-size: 2rem;
                }

                @media (max-width: 422px) {
                    font-size: 1.8rem;
                }

                @media (max-width: 400px) {
                    font-size: 1.6rem;
                }
            }

            /* Call to Action button styling */
            .btns {
                margin-top: 5rem;
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                @media (max-width: 1333px) {
                    flex-direction: column;
                    align-items: center;
                }

                button {
                    width: 45%;
                    height: 5rem;
                    border: none;
                    border-radius: 0.3rem;
                    font-size: 1.6rem;
                    font-weight: 700;
                    transition: all 300ms;

                    @media (max-width: 1333px) {
                        width: 20rem;
                        margin: 1rem 0;
                    }

                    &:hover {
                        transition: opacity 300ms;
                        opacity: 0.8;
                        cursor: pointer;
                    }
                }

                button.register {
                    background: #d1ffd6;
                }
            }
        }

        /* Call to Action image styling */
        .cta-img {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 65%;

            @media (max-width: 1120px) {
                width: 100%;
            }

            img {
                width: 80%;
                object-fit: cover;
            }
        }
    }


    /* Three column layout for information styling */
    .cols {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;

        /* Individual column styling */
        .col {
            width: 30%;

            h3 {
                font-size: 2.5rem;
                font-weight: 700;
                letter-spacing: 0.1rem;
                padding-bottom: 1rem;
                border-bottom: 1px dotted #444444;
                text-align: center;
            }

            p {
                padding: 0 3rem;
                line-height: 3rem;
                margin: 1rem 0;
                font-size: 1.6rem;
                text-align: justify;
                font-weight: 300;
            }

            &:nth-child(1) {
                border-right: 1px dotted #444444;
            }

            &:nth-child(3) {
                border-left: 1px dotted #444444;
            }

            @media (max-width: 1373px) {
                width: 50%;

                h3 {
                    padding-top: 1rem;
                }

                &:nth-child(3) {
                    margin-top: 5rem;
                    border-top: 1px dotted #444444;
                    border-left: none;
                    width: 100%;
                }
            }

            @media (max-width: 950px) {
                width: 100%;

                &:nth-child(1) {
                    border-right: none;
                }

                &:nth-child(2) {
                    margin-top: 5rem;
                }

                &:nth-child(3) {
                    border-top: none;
                }
            }
        }
    }
`;

export default Home;