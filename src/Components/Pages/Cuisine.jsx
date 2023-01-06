import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Cuisine() {
    const [cuisine, setCuisine] = useState([])
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d1f3da5858d74c919aabad83f1cab0ce&cuisine=${name}`)
        const recipes = await data.json();
        setCuisine(recipes.results);
    }

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type])
    return (
        <div>
                    {cuisine.map((item) => {
            return (
                <div className="card" style={{width: "18rem"}}>
                <Link to={'/recipe/' + item.id}>
                <img src={item.image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">{item.title}</p>
                    </div>
                    </Link>
            </div>
            )
        })}
        </div>
    )
}

export default Cuisine;