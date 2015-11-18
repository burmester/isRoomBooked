require(['config.js'], function () {
    require(['scripts/main.js'], function () {
        this.initialize();
        require(['async!https://apis.google.com/js/client.js!onload'], function () {
            this.checkAuth();
        });
    });
});