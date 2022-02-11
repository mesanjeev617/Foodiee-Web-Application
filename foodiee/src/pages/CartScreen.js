import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);
  
  return (
    <div>
      <form className="form">
        
        <div>
          <h1>Cart Items</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
              {user.orders[user.orders.length-1].order.map((singleOrder)=>{
                return <li key={singleOrder}>{singleOrder} $10</li>
              })}
              <br/>
              <h2>Sub Total: ${user.orders[user.orders.length-1].order.length * 10}</h2>
              <h2>Tax: (8%) ${user.orders[user.orders.length-1].order.length * 10*0.08} </h2>
              <h2>Service Fee: $5.00 </h2>
              <h2>Total: ${(user.orders[user.orders.length-1].order.length * 10) + 5+ (user.orders[user.orders.length-1].order.length * 10*0.08) }</h2>
              
          </>
        )}
      </form>
    </div>
  );
}