const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const axios = require('axios');
const travelPayoutsAPI = require('travelpayouts');

const app = express();

const webpackConfig = require('../webpack.config.dev');
const compiler = webpack(webpackConfig);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: false,
        noInfo: true
    })
);

app.use(webpackHotMiddleware(compiler));

app.listen(3000, () => console.log('Listening on port 3000!'));

const API_KEY = require('./config');
const API = travelPayoutsAPI({token: API_KEY});

app.get(['/prices'], (request, response) => {
    const {
        query: {
            origin,
            destination,
            departDate,
            returnDate
        }
    } = request;

    API.prices.cheap({
        origin,
        destination,
        depart_date: departDate,
        return_date: returnDate,
    }, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

app.get(['/map'], (request, response) => {
    const {
        query: {
            origin,
            oneWay,
            locale,
        },
    } = request;

    API.map.directions({
        origin_iata: origin,
        one_way: oneWay,
        locale,
    }, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

app.get(['/places'], async (request, response) => {
    const {
        query: {
            term,
            locale,
        }
    } = request;

    try {
        const result = await axios.get('http://autocomplete.travelpayouts.com/places2', {
            params: {
                term,
                locale,
            },
        });

        if (result.data) {
            response.json(result.data);
        }
    } catch (e) {
        response.json({error: e});
    }
});

app.get(['/cities'], async (request, response) => {
    const {
        query: {
            locale,
        }
    } = request;

    try {
        const result = await axios.get(`http://api.travelpayouts.com/data/${locale}/cities.json`);

        if (result.data) {
            response.json(result.data);
        }
    } catch (e) {
        response.json({error: e});
    }
});

app.get(['/countries'], async (request, response) => {
    const {
        query: {
            locale,
        }
    } = request;

    try {
        const result = await axios.get(`http://api.travelpayouts.com/data/${locale}/countries.json`);

        if (result.data) {
            response.json(result.data);
        }
    } catch (e) {
        response.json({error: e});
    }
});

module.exports = app;
