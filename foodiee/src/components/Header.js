import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Header.css'
import { signout } from '../reducers/userReducers';
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox';

function Header(){
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout())
    }
    return(
        <div className='header'>
            <Link to="/">
                <img className='header__logo' src='https://i.pinimg.com/originals/a8/d1/9b/a8d19bfb6d5172adc87d65908c69137a.jpg' alt='foodiee'/>
            </Link>
            
            <SearchBox/>

            {userInfo ? (
                <Link to="/cart">
                <div className="header__optionBasket"> 
                     <span className="header__optionLineTwo header__basketCount">Cart</span>
                </div> 
            </Link>
            ) : ''}

            <Link to="/signin">
                <div className="header__optionBasket"> 
                    {userInfo ? <Link to='/profile'> {`Welcome ${userInfo.firstname}`}</Link> :<span className="header__optionLineTwo header__basketCount">Sign In</span> } 
                </div> 
            </Link>

            <Link to="/signout" onClick={signoutHandler}>
                <div className="header__optionBasket"> 
                     <span className="header__optionLineTwo header__basketCount">Sign Out</span>
                </div> 
            </Link>
        </div>
    );
}

export default Header;