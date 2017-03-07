/* =================================================================================
 * @author Vladimir Polyakov
 * =================================================================================
 * Copyright (c) 2015-2017 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden.webdriver/blob/master/LICENSE)
 * ============================================================================== */

var path = require('path');
var fs = require('fs');

module.exports = function (driver, selenium) {
    var checkSizzleExists, injectSizzleIfMissing, injectSelector, one;

    checkSizzleExists = function () {
        return driver.executeScript(function () {
            return window.Sizzle != null;
        });
    };

    injectSizzleIfMissing = function (sizzleExists) {
        if (! sizzleExists) {
            var sizzleCode = fs.readFileSync(path.join(__dirname, '../../node_modules/sizzle/dist', 'sizzle.min.js'));
            return driver.executeScript("var module = {exports: {}};\n" + sizzleCode + "\nwindow.Sizzle = module.exports;").then(injectSelector);
        }
    };

    injectSelector = function () {
        return driver.executeScript("window.Sizzle.selectors.pseudos['contains-only'] = window.Sizzle.selectors.createPseudo(function(text) {return function(elem) { return (elem.textContent || elem.innerText) == text; }; });");
    };

    one = function (selector) {
        var finder;
        finder = function () {
            return checkSizzleExists().then(injectSizzleIfMissing).then(function () {
                return driver.findElement(selenium.By.js(function (selector) {
                    return (window.Sizzle(selector) || [])[0];
                }, selector));
            }).catch(function (err) {
                throw new Error("Selector " + selector + " matches nothing");
            });
        };
        return driver.findElement(finder);
    };

    one.all = function (selector) {
        var finder;
        finder = function () {
            return checkSizzleExists().then(injectSizzleIfMissing).then(function () {
                return driver.findElements(selenium.By.js(function (selector) {
                    return window.Sizzle(selector) || [];
                }, selector));
            }).catch(function (err) {
                throw new Error("Selector " + selector + " matches nothing");
            });
        };
        return driver.findElements(finder);
    };

    return one;
};
