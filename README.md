# plus.garden.webdriver [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
[API Reference](./docs/API-reference.md) |
[CSS Selectors](./docs/css-selectors.md) |
[Selenium installation guide](./docs/selenium-installation.md)
> Webdriver for Garden.js

## Installing/Configuring

Suppose, you already have a project with configured garden environment (more info [here](https://github.com/linkshare/plus.garden#getting-started)).
Now you need to add _plus.garden.webdriver_ as a dependency in your `garden/package.json`:

```json
    "dependencies": {
        /* ... */
        "plus.garden.webdriver": "~0.0.1",
        /* ... */
      }
```

And run npm install

```bash
    npm install
```

Or just add and install the dependency automatically via npm:

```bash
    $ cd garden
    $ npm install --save plus.garden.webdriver
```

Now register the installed module in `garden/container.js`:

```javascript
    module.exports = function (container) {
        //...
        container.register('Webdriver', require('plus.garden.webdriver'));
        //...
    }
```

And add the registered module to garden's "world"

```javascript
    // garden/DIR_WITH_YOUR_TESTS/support/world.js

    var World = function World(callback) {
        garden.get('Webdriver.Browser').create(function (browserService) {
            this.browserService = browserService;
            this.driver = browserService.driver;
            this.browser = browserService.browser;
        }.bind(this));
    }
    
    defineSupportCode(function({setWorldConstructor}) {
        /* ... */
        setWorldConstructor(World);
        /* ... */
    });

```

That's it. Your garden is ready to use the webdriver module.

You also can install this package with [Garden generator](https://github.com/Dsazz/generator-garden).


## Dependencies

For using plus.garden.webdriver you should install and run Selenium server. You can install and manage it in any convenient way.

We provide a list of steps for installing [Selenium](http://www.seleniumhq.org/), which we tested in our package. See [here](https://github.com/Dsazz/plus.garden.webdriver/blob/master/docs/selenium-installation.md).


[npm-image]: https://badge.fury.io/js/plus.garden.webdriver.svg
[npm-url]: https://npmjs.org/package/plus.garden.webdriver
[daviddm-image]: https://david-dm.org/Dsazz/plus.garden.webdriver.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Dsazz/plus.garden.webdriver
