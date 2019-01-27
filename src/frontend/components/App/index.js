import {connect} from "react-redux";
import App from './App.jsx';
import {FETCH_IMAGES, LOADING_COMPLETE} from "../../actions";

const mapStateToProps =  ({images}) => {
  return {
    images: images.images,
    loading: images.isFetching,
    error: images.error
  }
};

const mapDispatchToProps = {
  fetchImages: () => ({ type: FETCH_IMAGES})
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

