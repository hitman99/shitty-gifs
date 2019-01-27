import {combineReducers} from 'redux';
import imagesFetch from './imagesFetch';

export default combineReducers({
    ui: state => '',
    img: imagesFetch
});