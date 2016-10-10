# js12

[![Build Status](https://travis-ci.org/heynemann/generator-js12.svg?branch=master)](https://travis-ci.org/heynemann/generator-js12)
[![Coverage Status](https://coveralls.io/repos/github/heynemann/generator-js12/badge.svg?branch=master)](https://coveralls.io/github/heynemann/generator-js12?branch=master)

JS12 generator is an yeoman generator that will get you up and running with a 12-factor app in node.js.

## Features

- [ ] Thorough suite of unit tests for generator code;
- [ ] Comprehensive Makefile to setup, build, test, analyze, dockerize and document your Go Package;
- [ ] [npm](https://www.npmjs.com/) package manager;
- [ ] [SemVer](http://semver.org/) compatible metadata versioning;
- [ ] [BabelJS](https://babeljs.io/) configured to enable modern JS;
- [ ] [Webpack](https://webpack.github.io/) generated output for npm distribution;
- [ ] [Nodemon](http://nodemon.io/)-powered Web Server to enable "live-reload" of changes;
- [ ] [Ecmascript 6.0 modules](http://www.2ality.com/2014/09/es6-modules-final.html) support (import * from package);
- [ ] [Async/Await](https://jakearchibald.com/2014/es7-async-functions/) support (even in tests);
- [ ] Configuration system using [node-config](https://github.com/lorenwest/node-config);
- [ ] Structured logging using [Bunyan](https://github.com/trentm/node-bunyan);
- [ ] [yargs.js](http://yargs.js.org/) commands;
- [ ] [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) test suite with Coverage support;
- [ ] Generated code has 100% code coverage in [Mocha](https://mochajs.org/) test suite;
- [ ] Benchmark of API routes using [matcha](https://github.com/logicalparadox/matcha);
- [ ] Profiling of API code with [njstrace](https://github.com/valyouw/njstrace);
- [ ] Static Analysis of syntax, comments and duplicated code using [plato](https://github.com/es-analysis/plato);
- [ ] Stochastic flame graph profiling of your code using [0x](https://github.com/davidmarkclements/0x);
- [ ] Contextual migrations depending on the Service and ORM being used;
- [ ] [Docker](https://www.docker.com/) container to run API;
- [ ] [Docker](https://www.docker.com/) container to run API in Dev Mode with [Docker Compose](https://docs.docker.com/compose/);
- [ ] Allow easy creation of new commands with `yo js12:command`;
- [ ] Allow easy creation of migrations with `yo js12:migration`;
- [ ] Allow easy creation of API handlers with `yo js12:handler`;
- [ ] Easy version handling with `yo js12:major`, `yo js12:minor`, `yo js12:patch`, `yo js12:beta` and `yo js12:rc 1`;
- [ ] [Sphinx](http://www.sphinx-doc.org/en/stable/) documentation;
- [ ] [Travis CI](https://travis-ci.org/) ready;
- [ ] [Jenkins CI](https://jenkins.io/) ready.

### Supported Services

- [ ] [Koa](http://koajs.com/)-powered HTTP API;
- [ ] [Redis](http://redis.io/) Service using [redis](https://github.com/NodeRedis/node_redis) as the library;
- [ ] [MongoDB](https://www.mongodb.com/) Database using [mongoose](http://mongoosejs.com/) as the ORM;
- [ ] [Nats](https://nats.io/) PubSub using [node-nats](https://github.com/nats-io/node-nats) as the library;
- [ ] [ElasticSearch](https://www.elastic.co/) Service using [elasticsearch-js](https://github.com/elastic/elasticsearch-js) as the library;
- [ ] [PostgreSQL](https://www.postgresql.org/) Database using [sequelize](https://github.com/sequelize/sequelize) as the ORM;
- [ ] [MySQL](https://www.mysql.com/) Database using [sequelize](https://github.com/sequelize/sequelize) as the ORM.

## Getting started

Make sure you have the latest version of Yeoman:

```
$ npm install -g yo
```

To install generator-js12 from npm, run:

```
$ npm install -g generator-js12
```

## Usage

Go to your package directory (must be inside `$GOPATH`) and run:

```
$ yo js12
```

## Contributing

Just fork, go to a feature branch, make your changes, run tests and open a pull request. Rinse and repeat!

### Installing locally

To run the generator locally, in order to test changes:

```
$ npm link
```

After linking you'll be able to run `yo js12` commands.

### Running tests

Just run `npm test` and wait. The tests take a while due to glide installing the packages and go compiling the binary.
