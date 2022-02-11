import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage'
import Home from './Components/Home';
import VideogameCreate from './Components/VideogameCreate';
import Detail from './Components/Details';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage/>}></Route>
          <Route path='/videogames' element={<Home/>}></Route>
          <Route path='/videogame' element={<VideogameCreate/>}></Route>
          <Route path='/videogames/:id' element={<Detail/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
