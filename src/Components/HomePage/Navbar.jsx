import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { GiKnifeFork} from 'react-icons/gi';
import { BsSearch} from 'react-icons/bs';
import Category from '../HomePage/Category'


function Navbar() {

        const navigate = useNavigate();
        const [input, setInput] = useState("")
        const submitHandler = (e) => {
            e.preventDefault();
            navigate('/searched/' + input)
            setInput(input)
        }


        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href='/homepage'>Recipe App <GiKnifeFork /></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active mx-5" aria-current="page" href='/'>Make Delicious Food With Us</a>
                                    </li>
                                </ul>
                                <form className="d-flex" role="search" onSubmit={submitHandler}>
                                    <input className="form-control me-2" onChange={(e) => { setInput(e.target.value) }} type="search" placeholder="Search" aria-label="Search" />
                                    <span></span>
                                    <button className="btn btn-outline-info" onClick={() => { navigate('/signin') }} type="submit">Logout</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
                <Category/>
            </div>
        )
    }

    export default Navbar;