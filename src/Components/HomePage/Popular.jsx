import React, { useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Popular() {


    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=d1f3da5858d74c919aabad83f1cab0ce&number=20`);
        const data = await api.json();
        setPopular(data.recipes)
        console.log(data.recipes);
    }

    return (
        <div className='container'>
            {/* <Navbar/> */}

            <div> <br />
                <h3>Our Popular Recipes : </h3> <br />
                <Splide
                    options={{
                        perPage: 4,
                        arrows: true,
                        pagination: true,
                        drag: 'free',
                        gap: '5rem',
                    }} >

                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <div className="card">
                                <Link to={'/recipe/' + recipe.id}>
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                    <img src={recipe.image} className="card-img-top" alt="..." />
                                    <p className="h6">{recipe.title}</p>
                                    </li> </ul>
                                    </Link>
                                </div>
                            </SplideSlide>
                        );
                    })}
                </Splide >
            </div >

        </div >
    )
}

export default Popular