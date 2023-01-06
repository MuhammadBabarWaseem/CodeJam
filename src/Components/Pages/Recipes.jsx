import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

function Recipes() {


    let params = useParams();
    // console.log(params);
    const [details, setDetails] = useState([]);
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=d1f3da5858d74c919aabad83f1cab0ce`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData)
    }
    // console.log('param name ' ,params.id);

    useEffect(() => {
        fetchDetails();
    }, [params.id])
    return (
        <div>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} className='img-thumbnail' alt={details.title} />
            </div>
            <div>
                <button className={activeTab === 'instructions' ? 'active' : ''} id='btn-ins' onClick={() => setActiveTab('instructions')}>Instructions</button>
                <button className={activeTab === 'ingredients' ? 'active' : ''} id='btn-ins' onClick={() => setActiveTab('ingredients')}>Ingredients</button>

                {activeTab === 'instructions' && (
                    <div>
                        <h6 style={{ marginTop: '2rem' }} dangerouslySetInnerHTML={{ __html: details.summary }}></h6>
                        <h6 dangerouslySetInnerHTML={{ __html: details.instructions }}></h6>
                    </div>
                )}

                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        )
                        )}
                    </ul>
                )}
            </div>


        </div>
    )
}

export default Recipes;