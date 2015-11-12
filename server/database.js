define(function (require) {
    var mongoose = require('mongoose'),
        _ = require('underscore');
    mongoose.connect('mongodb://localhost/gotcoffee');

    var Weight = mongoose.model('Weight', new mongoose.Schema({
        date: Date,
        weight: Number
    }));

    return {
        create: function (callback, weight) {
            if (_.isFunction(callback)) {
                Weight.create({weight: weight, date: new Date()}, callback);
            } else {
                Weight.create({weight: callback, date: new Date()});
            }
        },
        find: function (conditions, callback) {
            Weight.find(conditions, callback);
        },
        remove: function (conditions, callback) {
            Weight.remove(conditions, callback);
        }
    }
});