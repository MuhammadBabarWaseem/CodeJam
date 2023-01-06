import React from 'react'
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';
import { db } from '../Utils/Firebase';
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Veggies() {

    const auth = getAuth();
    const user = auth.currentUser;

    const [veggie, setVeggie] = useState([]);

    useEffect(() => {

        getVeggie();
    }, []);

    const addToFavorite = () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                // setDoc(doc(db, "users", uid), {
                //     name: "Los Angeles",
                //     state: "CA",
                //     country: "USA"
                // });


            }
        });
    }

    const getVeggie = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=d1f3da5858d74c919aabad83f1cab0ce&number=15&tags=vegetarian`);
        const data = await api.json();
        setVeggie(data.recipes)
        // console.log(data.recipes);
    }

    return (

        <div className='container'>
            <div>
                <br />
                <h3>Our Vegetarian Recipes : </h3> <br />

                <Splide
                    options={{
                        perPage: 3,
                        arrows: true,
                        pagination: false,
                        drag: 'free',
                        gap: '4rem',
                    }}
                >
                    {veggie.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <div className="card">
                                    <Link to={'/recipe/' + recipe.id}>
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <div className='containerr'>
                                                    <img src={recipe.image} className="card-img-top" alt="..." />
                                                    <button className='button' onClick={addToFavorite}>Add To Favorite</button>
                                                </div>
                                                <p className="h6">{recipe.title}</p>
                                            </li> </ul>
                                    </Link>
                                </div>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </div>
        </div>
    )

}

export default Veggies