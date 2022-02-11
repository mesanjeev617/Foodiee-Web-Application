import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {createReview, detailsResturant} from '../actions/resturantActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
import '../CSS/ResturantScreen.css'
import Rating from '../components/Rating'
import { RESTURANT_REVIEW_CREATE_RESET } from '../constants/resturantConstants';
import {createOrder} from '../actions/userActions'

export default function ResturantScreen(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {id: resturantId} = params;

    const resturantDetails = useSelector(state => state.resturantDetails);
    const {loading, error, resturant} = resturantDetails;
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const resturantReviewCreate = useSelector((state) => state.resturantReviewCreate);
    const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
    } = resturantReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [order, setOrder] = useState([]);

    useEffect(()=> {
        if(successReviewCreate){
            window.alert('Review Submitted Successfully...');
            setRating('');
            setComment('');
            dispatch({type: RESTURANT_REVIEW_CREATE_RESET});
        }
        dispatch(detailsResturant(resturantId));
    }, [dispatch, resturantId, successReviewCreate]);

    const clickHandler = (e)=>{
        //
        e.preventDefault();
        setOrder([...order, e.target.value]);
        
        
    }

    const addToCart = () => {
        if(order.length !== 0){
            dispatch(
                createOrder(userInfo._id, resturantId, {order})
             );
        }
        navigate('/cart');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating){
            dispatch(
                createReview(resturantId, {rating, comment, name: userInfo.firstname})
            );
        }else {
            alert('Please enter comment and rating ...')
        }
    }

    return(
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>) :
                    error ? (
                        <MessageBox variant="danger">{error}</MessageBox> )
                        : (
                        <div>
                            <br/>
                            <br/>
                            <br/>
                            <Link to="/">Back to home</Link>
                            <div className="row top">
                <div className="col-2"> 
                    <img className="large" src={resturant.image} alt={resturant.name}></img>
                </div>
                <div className="col-1">
                <ul>
                    <li> 
                    <h1>{resturant.name}</h1>
                    </li>
                    <li>
                        <h2>{resturant.address}</h2>
                    </li>
                    <li> 
                    <div className="product__rating">
                    <Rating rating={resturant.rating} numReviews={resturant.numReviews}></Rating>
                    </div>
                    </li>
                    
                    <div>
                        <h2>Menu:</h2>
                        {
                            resturant.foodMenu.map(item =>
                                    <li key={item}  >
                                        <button onClick={clickHandler} value={item} disabled={!userInfo}>{item} </button>
                                    </li>
                            )
                        }
                    </div>
                    <h2>Order Summary</h2>
                    <br/>
                    {order.length ===0 ? 
                    <h2>Your order is empty..Click on menu to Order</h2>
                    : (order.map((item)=>{
                        return <li key={item}>{item}</li>
                    }))}
                    <br/>
                    <button className='primary' onClick={addToCart} disabled={!userInfo}>Add to Cart</button>
                </ul>
            </div>
        </div>
        
        <div>
            <h2 id='reviews'>Reviews</h2>
            {resturant.reviews.length === 0 && (
                <MessageBox>There is no reviews for this resturant....</MessageBox>
            )}
            <ul>
                {resturant.reviews.map((review)=>(
                    <li key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" " numReviews={review.rating}></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                    </li>
                ))}
                <li>
                {userInfo ? (
                    <form className='form' onSubmit={submitHandler}>
                        <div>
                            <h2>Write a customer review:</h2>
                        </div>
                        <div>
                            <label htmlFor='rating'>Rating</label>
                            <select id='rating' value={rating} onChange={(e)=> setRating(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='1'>1-Poor</option>
                                <option value='2'>2-Fair</option>
                                <option value='3'>3-Good</option>
                                <option value='4'>4-Very Good</option>
                                <option value='5'>5-Excellent</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='comment'>Comment</label>
                            <textarea id='comment' value={comment}
                            onChange={(e)=> setComment(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label/>
                            <button className='primary' type='submit'>Submit</button>
                        </div>
                        <div>
                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                            {errorReviewCreate && (
                                <MessageBox variant="danger">
                                    {errorReviewCreate}
                                </MessageBox>
                            )}
                        </div> 
                    </form>
                ) :(
                    <MessageBox>
                        Please <Link to="/signin">Sign In</Link> to write the review...
                    </MessageBox>
                )}
                </li>
            </ul>
        </div>

    </div>)})
</div>);
}