import { RESTURANT_DETAILS_FAIL, RESTURANT_DETAILS_REQUEST, RESTURANT_DETAILS_SUCCESS, RESTURANT_LIST_FAIL, RESTURANT_LIST_REQUEST, RESTURANT_LIST_SUCCESS, RESTURANT_REVIEW_CREATE_FAIL, RESTURANT_REVIEW_CREATE_REQUEST, RESTURANT_REVIEW_CREATE_RESET, RESTURANT_REVIEW_CREATE_SUCCESS } from "../constants/resturantConstants";

export const resturantListReducer = (state = {loading: true, resturants: []}, action)=> {
    switch(action.type){
        case RESTURANT_LIST_REQUEST:
            return {loading: true};
        case RESTURANT_LIST_SUCCESS:
            return {loading: false, resturants: action.payload};
        case RESTURANT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const resturantDetailsReducer = (
    state = { resturant: {}, loading: true },
    action
  ) => {
    switch (action.type) {
      case RESTURANT_DETAILS_REQUEST:
        return { loading: true };
      case RESTURANT_DETAILS_SUCCESS:
        return { loading: false, resturant: action.payload };
      case RESTURANT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const resturantReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case RESTURANT_REVIEW_CREATE_REQUEST:
        return { loading: true };
      case RESTURANT_REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case RESTURANT_REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case RESTURANT_REVIEW_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };