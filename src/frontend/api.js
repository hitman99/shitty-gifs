import endpoints from './end-points.json';

export const fetchImages = async () => {
    try {
        const response = await fetch(endpoints.fetchImages);
        const data = await response.json();
        return data;
    } catch (e) {
        return e;
    }
};