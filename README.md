# plus.garden.webdriver [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
[API Reference](./docs/API-reference.md) |
[CSS Selectors](./docs/css-selectors.md) |
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

For using [plus.garden.webdriver](https://github.com/Dsazz/plus.garden.webdriver/) you should install and run [Selenium server](http://www.seleniumhq.org/download/). You can install and manage it in any convenient way. For example, you can use [webdriver-manager](https://www.npmjs.com/package/webdriver-manager) or [Docker](https://www.docker.com/) with your configurations for [Selenium server](http://www.seleniumhq.org/) or by provided in [generator-garden](https://github.com/Dsazz/generator-garden) [configuration file](https://github.com/Dsazz/generator-garden/blob/master/generators/app/templates/docker-compose.yml) for [docker-compose](https://docs.docker.com/compose/), which you can install, if answer "YES" on related question.


[npm-image]: https://badge.fury.io/js/plus.garden.webdriver.svg
[npm-url]: https://npmjs.org/package/plus.garden.webdriver
[daviddm-image]: https://david-dm.org/Dsazz/plus.garden.webdriver.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Dsazz/plus.garden.webdriver
