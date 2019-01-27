export default function imagesFetch(state = {}, action) {
    switch (action.type) {
        case 'FETCH_IMAGES':
            return { isFetching: true };
        case 'IMAGES_FETCH_SUCCEEDED':
            return { data: action.data, isFetching: false };
        default:
            return state
    }
}