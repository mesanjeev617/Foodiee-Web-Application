import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Link} from 'react-router-dom'
import { listResturants } from '../actions/resturantActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const {name = 'all'} = useParams();
    const dispatch = useDispatch();
    const resturantList = useSelector(state => state.resturantsList);
    const {loading, error, resturants} = resturantList;
    useEffect(()=>{
        dispatch(listResturants({name: name !== 'all' ? name : ''}));
    }, [dispatch, name]);

    return(
        <div>
            <div className='row'>
                {
                    loading ? (
                        <LoadingBox></LoadingBox>
                    ): error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ): (
                        <div>
                          <h1/>
                          <br/>
                          <h1>Search Result</h1>
                          <h2>{resturants.length} results found</h2>
                        
                        </div>
                    )}
            </div>

            

            <div className='col-3'>
            {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {resturants.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
                
              )}
              <Link to="/">Go Back</Link>
              <div className="home__row">
                 {resturants.map(resturant=>(
                 <Product key={resturant._id} resturant={resturant}></Product>
                ))}
              </div>
            </>
          )}
            </div>
        </div>
    )
}
