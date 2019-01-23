import { takeLatest, call, all, put } from 'redux-saga/effects';
import { fetchImages } from "../api";

export function * rootSaga() {
    yield all([
        watchImagesAsync()
    ])
}

export function * getImages() {
    try {
        yield put({type: "FETCH_IMAGES",  isFetching: true});
        const data = yield call(fetchImages);
        yield put({type: "IMAGES_FETCH_SUCCEEDED",  data: data, isFetching: false})
    } catch (error) {
        yield put({type: "FETCH_FAILED", error})
    }
}

export function * watchImagesAsync() {
    yield takeLatest('fetch_images', getImages)
}