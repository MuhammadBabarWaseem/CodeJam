import './App.css';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Cuisine from './Components/Pages/Cuisine';
import Searched from './Components/Pages/Searched';
import Recipes from './Components/Pages/Recipes';

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path='/cuisine/:type' element={<Cuisine/>} />
            <Route path='/searched/:search' element={<Searched/>} />
            <Route path='/recipe/:id' element={<Recipes/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
