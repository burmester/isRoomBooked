var require = require('requirejs'),
    http = require('http'),
    express = require('express'),
    _ = require('underscore');

var app = express();

app.use('/bower_components', express.static('../bower_components'));

app.use(express.static('../client/'));

app.get('/johan', function (req, res) {
    res.status(200).send({text: 'hej'});
});

app.get('*', function (req, res) {
    res.status(404).send('Unrecognised API call');
});

app.use(function (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});

app.listen(3000);
console.log('App Server is listening on port 3000');
