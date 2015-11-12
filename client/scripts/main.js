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
        startTime();
    });


    this.startTime = function () {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 500);
    }

    this.checkTime = function (i) {
        if (i < 10) {
            i = "0" + i
        }
        ;  // add zero in front of numbers < 10
        return i;
    }
});