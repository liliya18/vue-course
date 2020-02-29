import Vue from 'vue';
import Vuex from 'vuex';

import placesApi from '../actions/get-places';

import {
    GET_PLACES,
    GET_DIRECTIONS,
    GET_CITIES,
    GET_COUNTRIES,
    GET_MAP_COORDINATES,
    SET_FORM_DATA,
} from '../constants/mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        formData: {
            origin: '',
            originCode: '',
            destination: '',
            destinationCode: '',
            departDate: '',
            returnDate: '',
            oneWay: false,
        },
        places: new Map(),
        directions: {},
        cities: [],
        countries: [],
        mapCoordinates: [],
    },
    mutations: {
        [SET_FORM_DATA](state, data) {
            state.formData = data;
        },
        [GET_PLACES](state, {key, data}) {
            state.places.set(key, data);
        },
        [GET_DIRECTIONS](state, data) {
            state.directions = data;
        },
        [GET_CITIES](state, data) {
            state.cities = data;
        },
        [GET_COUNTRIES](state, data) {
            state.countries = data;
        },
        [GET_MAP_COORDINATES](state, data) {
            state.mapCoordinates = data;
        },
    },
    actions: {
        setFormData({commit}, data) {
            commit(SET_FORM_DATA, data);
        },
        async getPlaces({state, commit}, param) {
            const isRequestHasBeenMade = state.places.has(param) && state.places.get(param);

            if (isRequestHasBeenMade) return;

            try {
                const response = await placesApi.getPlaces(param);
                commit(GET_PLACES, {
                    key: param,
                    data: response.data,
                });
            } catch (e) {
                console.error('Error:', e);
            }
        },
        async getDirections({commit}, params) {
            try {
                const response = await placesApi.getDirections(params);
                commit(GET_DIRECTIONS, response.data);
            } catch (e) {
                console.error('Error', e);
            }
        },
        async getCities({commit}) {
            try {
                const response = await placesApi.getCities();
                commit(GET_CITIES, response.data);
            } catch (e) {
                console.error('Error', e);
            }
        },
        async getCountries({commit}) {
            try {
                const response = await placesApi.getCountries();
                commit(GET_COUNTRIES, response.data);
            } catch (e) {
                console.error('Error', e);
            }
        },
        async getMapCoordinates({commit}, params) {
            try {
                const response = await placesApi.getMapCoordinates(params);
                commit(GET_MAP_COORDINATES, response.data);
            } catch (e) {
                console.error('Error', e);
            }
        },
    },
    getters: {
        formData: state => state.formData,
        places: state => param => {
            if (!state.places.has(param)) {
                return [];
            }
            return state.places.get(param);
        },
        directions: state => state.directions,
        city: state => code => state.cities.find(city => city.code === code),
        country: state => code => state.countries.find(country => country.code === code),
        mapDirections: state => {
            if (state.mapCoordinates.directions === undefined) {
                return [];
            }
            return state.mapCoordinates.directions.reduce((objectsByKeyValue, obj) => {
                const value = obj.country;
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});
        },
    },
});
