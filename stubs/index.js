const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get(['/api'], function (request, response) {
    setTimeout(() =>
        response
            .header('Content-Type', 'application/json')
            .send(
                { text: 'Hello world!' }
            )
        , 2000);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

module.exports = app;