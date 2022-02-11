import Axios from 'axios';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_ORDER_CREATE_REQUEST, USER_ORDER_CREATE_SUCCESS, USER_ORDER_CREATE_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL} from '../constants/userConstants';


export const register = (firstname, lastname, email, password) => async(dispatch) =>{
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {firstname, lastname, email, password}
    });
    try{
        const {data} = await Axios.post('http://localhost:3000/auth/register', {firstname, lastname, email, password});
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch(error){
        dispatch({type: USER_REGISTER_FAIL, 
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })

    }
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {email, password}
    })
    try{
        const {data} = await Axios.post('http://localhost:3000/auth/signin', {email, password});
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch(error){
        dispatch({type: USER_SIGNIN_FAIL, 
            payload:
             error.response && error.response.data.message ? error.response.data.message : error.message,
    })}
    
};

export const createOrder = (userId,resturantId, order) => async (
    dispatch,
    getState
) => {
    dispatch({type: USER_ORDER_CREATE_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post(`http://localhost:3000/order/${userId}/${resturantId}`,
        order,
        {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({
            type: USER_ORDER_CREATE_SUCCESS,
            payload: order,
        });
    } catch(error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_ORDER_CREATE_FAIL, payload: message });
    }
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`http://localhost:3000/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };