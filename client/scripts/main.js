define(function (require) {
        var $ = jQuery = require('jquery'),
            _ = require('underscore'),
            less = require('less'),
            moment = require('moment');

        require('moment_sv');

        var CLIENT_ID = '688126755729-o5f510lf0n270qk78qseah9sgjv9qr0d.apps.googleusercontent.com',
            SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

        this.initialize = function () {
            this.startTime();
        }

        this.startTime = function () {
            var time = moment().format('LLL');
            document.getElementById('clock').innerHTML = time;
            var t = setTimeout(this.startTime, 500);
        }


        this.checkAuth = function () {
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES.join(' '),
                    'immediate': true
                }, this.handleAuthResult);
        }

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        this.handleAuthResult = function (authResult) {
            if (authResult && !authResult.error) {
                this.loadCalendarApi();
            } else {
                this.handleAuthClick()
            }
        }

        /**
         * Initiate auth flow in response to user clicking authorize button.
         *
         * @param {Event} event Button click event.
         */
        this.handleAuthClick = function (event) {
            gapi.auth.authorize(
                {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
                this.handleAuthResult);
            return false;
        }

        /**
         * Load Google Calendar client library. List upcoming events
         * once client library is loaded.
         */
        this.loadCalendarApi = function () {
            gapi.client.load('calendar', 'v3', this.listUpcomingEvents);
        }

        /**
         * Print the summary and start datetime/date of the next ten events in
         * the authorized user's calendar. If no events are found an
         * appropriate message is printed.
         */
        this.listUpcomingEvents = function () {
            $(".calendar").each(function () {
                var $el = $(this),
                    $pre = $el.find('pre'),
                    calenderId = $el.data('calendarid'),
                    request = gapi.client.calendar.events.list({
                        'calendarId': calenderId,
                        'timeMin': (new Date()).toISOString(),
                        'showDeleted': false,
                        'singleEvents': true,
                        'maxResults': 10,
                        'orderBy': 'startTime'
                    });

                request.execute(function (resp) {
                    var events = resp.items;
                    $pre.append('Upcoming events:\n');
                    if (events.length > 0) {
                        for (i = 0; i < events.length; i++) {
                            var event = events[i];
                            var when = event.start.dateTime;
                            if (!when) {
                                when = event.start.date;
                            }
                            $pre.append(event.summary + ' (' + when + ')\n');
                        }
                    } else {
                        $pre.append('No upcoming events found.\n');
                    }
                });
            });
        }
    }
)
;