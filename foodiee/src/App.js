
import Login from "./pages/Login"
import Header from './components/Header';
import Home from './pages/Home'
import Register from './pages/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ResturantScreen from "./pages/ResturantScreen";
import SearchScreen from "./pages/SearchScreen";
import CartScreen from "./pages/CartScreen";
import ProfileScreen from "./pages/userProfile";

function App() {
  return (
  <BrowserRouter>
      <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} exact></Route>
            <Route path="/signin" element={<Login/>}></Route>
            <Route path="/signout" element={<Home/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/resturant/:id" element={<ResturantScreen/>}></Route>
            <Route path="/search/name" element={<SearchScreen/>} exact></Route>
            <Route path="/search/name/:name" element={<SearchScreen/>} exact></Route>
            <Route path='/profile' element={<ProfileScreen/>}></Route>
            <Route path="/cart" element={<CartScreen/>} ></Route>
          </Routes>
      </div> 
    </BrowserRouter>
  );
}

export default App;
