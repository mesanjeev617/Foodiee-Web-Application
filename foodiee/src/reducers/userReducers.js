import { USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_ORDER_CREATE_REQUEST, USER_ORDER_CREATE_SUCCESS, USER_ORDER_CREATE_FAIL, USER_ORDER_RESET, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "../constants/userConstants";

export const userRegisterReducer = (state={}, action)=>{
    switch(action.type){
            case USER_REGISTER_REQUEST:
                return {loading: true};
            case USER_REGISTER_SUCCESS:
                return {loading: false, userInfo: action.payload};
            case USER_REGISTER_FAIL:
                return {loading: false, error: action.payload};
            default: return state;
        }
    };

export const userSigninReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default: return state;
    }
};

export const signout = () => (dispatch) =>{
    localStorage.removeItem("userInfo");
    dispatch({type: USER_SIGNOUT});
}

export const userOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ORDER_CREATE_REQUEST:
        return { loading: true };
      case USER_ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case USER_ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case USER_ORDER_RESET:
        return {};
      default:
        return state;
    }
  };


  export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { loading: true };
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };