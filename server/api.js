var require = require('requirejs'),
    http = require('http'),
    express = require('express'),
    database = require('../server/database'),
    cronJob = require('cron').CronJob,
    exec = require('child_process').exec,
    _ = require('underscore');

var app = express(),
    job = new cronJob({
        cronTime: "*/5 6-20 * * *",
        onTick: function () {
            measuringWeight(database.create.bind(database))
        },
        start: false
    });

app.use('/bower_components', express.static('../bower_components'));
app.use(express.static('../client/'));

app.get('/measureCurrentWeight', function (req, res) {
    measuringWeight(database.create.bind(database, function (error, data) {
        res.status(200).send(data);
    }))
});
app.get('/weights', function (req, res) {
    database.find({}, function (error, weights) {
        res.status(200).send(weights);
    });
});
app.get('/weights/:date', function (req, res) {
    database.find({"date": new Date(req.params.date)}, function (error, weights) {
        res.status(200).send(weights);
    });
});
app.get('/removeAll', function (req, res) {
    database.remove({}, function (error, data) {
        res.status(200).send(data);
    });
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

function measuringWeight(callback) {
    /*
     'perl /local/bin/usbscale-simple.pl /dev/hidraw0'
     */

    exec('echo $((RANDOM%1500+0))',
        function (error, stdout, stderr) {
            callback(stdout);
        });

}

app.listen(3000);
console.log('App Server is listening on port 3000');
