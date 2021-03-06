/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015-2017 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden.webdriver/blob/master/LICENSE)
 * ============================================================================== */

var request = require('request-promise');

var Browser = function (config, BrowserConfig, logger, options) {
    this.config = config;
    this.webdriver = require('selenium-webdriver');

    var self = this;
    var host = this.config.get('host');

    this.connectToBrowser = function (callback) {

        var browser = this.getParameter('browser');
        var capabilities = this.getParameter('capabilities:' + browser);

        var serverHost = this.getParameter('server_host');
        var serverPort = this.getParameter('server_port');

        this.driver = new this.webdriver.Builder()
            .withCapabilities(capabilities)
            .usingServer('http://' + serverHost + ':' + serverPort + '/wd/hub')
            .build();

        this.$ = require('../lib/Sizzle')(this.driver, this.webdriver);
        this.Browser = require('chainit')(require('../lib/Browser'));
        this.browser = new this.Browser(this.driver, this.$, logger, {
            host: host,
            waitTimeout: this.getParameter('waitTimeout')
        });

        callback(self);
    };

    this.then = function (next) {
        self.seleniumRunOrExit();
        self.connectToBrowser(function () {
            next(self);
        });
    };

    this.seleniumRunOrExit = function () {
        var serverHost = this.getParameter('server_host');
        var serverPort = this.getParameter('server_port');

        request({
            uri: 'http://' + serverHost + ':' + serverPort + '/wd/hub',
            simple: false
        })
            .catch(function (err) {
                console.error('\x1b[31m', 'WEBDRIVER ' + err.message);
                process.exit();
            });
    }

    this.before = function () {
        var screenResolution = self.getParameter('screen_resolution');
        var screenWidth = parseInt(screenResolution.match(/^\d+/)[0]);
        var screenHeight = parseInt(screenResolution.match(/\d+$/)[0]);

        this.driver.manage().window().setSize(screenWidth, screenHeight);
    };

    this.after = function (next) {
        this.driver.quit().then(next);
    };

    this.getParameter = function (name) {
        return BrowserConfig.getParameter(name);
    };

    this.setParameter = function (name, value) {
        return BrowserConfig.setParameter(name, value);
    };

    this.init = function () {

        if (options.get('profile')) {
            this.setParameter('profile_name', options.get('profile'));
        }

        if (options.get('browser')) {
            this.setParameter('browser', options.get('browser'));
        }

    };

    this.init();

};

var BrowserFactory = function (config, BrowserConfig, logger, options) {
    return {
        create: function (next) {
            new Browser(config, BrowserConfig, logger, options).then(next);
        }
    };
};

module.exports = BrowserFactory;
module.exports.$inject = ['config', 'Webdriver.Browser.Config', 'Logger', 'Options'];
