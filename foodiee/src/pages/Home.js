import React, { useEffect } from 'react';
import Product from '../components/Product';
import '../CSS/Home.css'
import {useDispatch, useSelector} from 'react-redux';
import {listResturants} from '../actions/resturantActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


function Home(){
    const dispatch = useDispatch();
    const resturantList = useSelector(state => state.resturantsList );
    const {loading, error, resturants} = resturantList;


    useEffect(()=>{
      dispatch(listResturants({name: ''}));
    }, [dispatch]);
    
    return(
        <div className="home">

           <div className="home__container">
                <img className="home__image" src="https://scontent.fapa1-1.fna.fbcdn.net/v/t1.6435-9/96813310_3063154067039866_1145389652388085760_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=e3f864&_nc_ohc=dZuAvk6cAdYAX8P1qeJ&_nc_ht=scontent.fapa1-1.fna&oh=00_AT_jwOt8DdZXutW-k3sM-FI0MZWjiGwoV89GOJb9qYpJFA&oe=62239BF4"
                alt=""/>        
            <div>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ): (
                <div className="home__row">
                 {resturants.map(resturant=>(
                 <Product key={resturant._id} resturant={resturant}></Product>
            ))}   
         </div> 
            )}
        </div> 
            </div>
        </div>
    )
}

export default Home;