import {FETCH_IMAGES, FETCH_IMAGES_FAILED, FETCH_IMAGES_SUCCEEDED, FETCHING_IMAGES, LOADING_COMPLETE} from "../actions";

export default function images(state = {
  images: [],
  isFetching: false,
  error: null
}, action) {
    switch (action.type) {
      case FETCH_IMAGES:
        return {...state, isFetching: true, images: [], error: null};
      case FETCH_IMAGES_FAILED:
        return {...state, error: action.error, isFetching: false};
      case FETCH_IMAGES_SUCCEEDED:
        return {...state, error: null, images: action.payload, isFetching: false};
      default:
        return state;
    }
}