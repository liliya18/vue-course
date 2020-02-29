import axios from 'axios';

import {
    CITIES_URL, COUNTRIES_URL,
    DIRECTIONS_URL,
    MAP_URL,
    PLACES_URL
} from '../constants/api';

export default {
    getPlaces(term, locale = 'ru') {
        return axios.get(PLACES_URL, {
            params: {
                term,
                locale,
            },
        });
    },
    getMapCoordinates({origin, oneWay, locale = 'ru'}) {
        return axios.get(MAP_URL, {
            params: {
                origin,
                oneWay,
                locale,
            },
        });
    },
    getDirections({origin, destination, departDate, returnDate}) {
        return axios.get(DIRECTIONS_URL, {
            params: {
                origin,
                destination,
                departDate,
                returnDate
            },
        });
    },
    getCities(locale = 'ru') {
        return axios.get(CITIES_URL, {
            params: {
                locale,
            },
        });
    },
    getCountries(locale = 'ru') {
        return axios.get(COUNTRIES_URL, {
            params: {
                locale,
            },
        });
    },
}
