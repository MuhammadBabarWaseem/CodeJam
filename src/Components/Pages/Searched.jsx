import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';


function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([])

    let params = useParams();

    const getSearched = async (name) => {

        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d1f3da5858d74c919aabad83f1cab0ce&query=${name}`)
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    }

    useEffect(() => {
        getSearched(params.search)
    }, [params.search])


    return (
        <div className='row'>
            {searchedRecipes.map((item) => {
                return (
                        <div className="column" key={item.id}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={item.image} alt="" />
                                    <h5 className="card-title">{item.title}</h5>
                                </div>
                            </div>
                        </div>

                )
            })}
        </div>
    )
}




export default Searched;