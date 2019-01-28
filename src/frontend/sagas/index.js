import { takeEvery, call, all, put } from 'redux-saga/effects';
import {FETCH_IMAGES, FETCH_IMAGES_FAILED, FETCH_IMAGES_SUCCEEDED} from "../actions";
import { fetchImages } from "../api";

export function * rootSaga() {
    yield all([
        watchImagesAsync()
    ])
}

export function * getImages() {
    const data = yield call(fetchImages);
    if (data instanceof Error) {
      yield put({type: FETCH_IMAGES_FAILED,  error: data})
    } else {
      yield put({type: FETCH_IMAGES_SUCCEEDED,  payload: data})
    }
}

export function * watchImagesAsync() {
    yield takeEvery(FETCH_IMAGES, getImages)
}