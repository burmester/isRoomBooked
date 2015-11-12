define(function (require) {
    var $ = jQuery = require('jquery'),
        _ = require('underscore'),
        less = require('less');


    var render = function () {
        $.getJSON("/johan", function (data) {
            console.log(data);
        });
        console.log('johan');
    };

    $(document).ready(function () {
        render();
    });
});