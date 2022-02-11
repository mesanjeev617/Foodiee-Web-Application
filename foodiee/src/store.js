import thunk from 'redux-thunk';
import { resturantDetailsReducer, resturantListReducer, resturantReviewCreateReducer } from './reducers/resturantReducers';

const { combineReducers, compose, createStore, applyMiddleware } = require("redux")
const { userRegisterReducer, userSigninReducer, userOrderCreateReducer, userDetailsReducer } = require("./reducers/userReducers")


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')): null
    },
}

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    resturantsList: resturantListReducer,
    resturantDetails: resturantDetailsReducer,
    resturantReviewCreate: resturantReviewCreateReducer,
    userOrderCreate: userOrderCreateReducer,
    userDetails: userDetailsReducer,


})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;