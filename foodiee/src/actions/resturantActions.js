import Axios from 'axios';
import {RESTURANT_DETAILS_FAIL, RESTURANT_DETAILS_REQUEST, RESTURANT_DETAILS_SUCCESS, RESTURANT_LIST_FAIL, RESTURANT_LIST_REQUEST, RESTURANT_LIST_SUCCESS, RESTURANT_REVIEW_CREATE_FAIL, RESTURANT_REVIEW_CREATE_REQUEST, RESTURANT_REVIEW_CREATE_SUCCESS} from '../constants/resturantConstants'

export const listResturants = ({name=''}) => async (dispatch) =>{
    dispatch({
        type: RESTURANT_LIST_REQUEST
    })
    try{
        const {data} = await Axios.get(`http://localhost:3000/?name=${name}`);
        dispatch({
            type: RESTURANT_LIST_SUCCESS, payload: data
        });
    } catch(error){
        dispatch({
            type: RESTURANT_LIST_FAIL, payload: error.message
        })
    }
};

export const detailsResturant = (resturantId) => async (dispatch) =>{
    dispatch({ type: RESTURANT_DETAILS_REQUEST, payload: resturantId});
    try{
        const {data} = await Axios.get(`http://localhost:3000/resturant/${resturantId}`);
        dispatch({
            type: RESTURANT_DETAILS_SUCCESS, payload: data,
        })
    } catch (error) {
        dispatch({
        type: RESTURANT_DETAILS_FAIL,
        payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
};

export const createReview = (resturantId, review) => async (
    dispatch,
    getState
) => {
    dispatch({type: RESTURANT_REVIEW_CREATE_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post(`http://localhost:3000/resturants/${resturantId}/reviews`,
        review,
        {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({
            type: RESTURANT_REVIEW_CREATE_SUCCESS,
            payload: data.review,
        });
    } catch(error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: RESTURANT_REVIEW_CREATE_FAIL, payload: message });
    }
}