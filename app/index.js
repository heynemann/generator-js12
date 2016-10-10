var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var exec = require('child_process').exec;


const getCtxFunc = function(pkg, title) {
  return function(ctx) {
    if (!pkg) {
      return Object.assign({}, ctx.package)
    }
    return Object.assign({}, { pkg: pkg, title: title }, ctx.package)
  }
}

const packageContents = [
  //Makefile
  { source: '_makefile', target: 'Makefile', ctx: getCtxFunc() },

  //.gitignore
  { source: '_gitignore', target: '.gitignore', ctx: getCtxFunc() },

  //glide
  //{ source: '_glide.yaml', target: 'glide.yaml', ctx: getCtxFunc() },

  //main
  //{ source: '_suite_test.go', target: 'main_suite_test.go', ctx: getCtxFunc('main', 'Main')},
  //{ source: '_main.go', target: 'main.go', ctx: getCtxFunc() },
  //{ source: '_main_test.go', target: 'main_test.go', ctx: getCtxFunc() },

  //metadata
  //{ source: '_suite_test.go', target: 'metadata/metadata_suite_test.go', ctx: getCtxFunc('metadata', 'Metadata') },
  //{ source: '_metadata_version.go', target: 'metadata/version.go', ctx: getCtxFunc() },
  //{ source: '_metadata_version_test.go', target: 'metadata/version_test.go', ctx: getCtxFunc() },

  //cmd
  //{ source: '_suite_test.go', target: 'cmd/cmd_suite_test.go', ctx: getCtxFunc('cmd', 'Commands') },
  //{ source: '_cmd_helpers_test.go', target: 'cmd/helpers_test.go', ctx: getCtxFunc() },
  //{ source: '_cmd_root.go', target: 'cmd/root.go', ctx: getCtxFunc() },
  //{ source: '_cmd_root_test.go', target: 'cmd/root_test.go', ctx: getCtxFunc() },
  //{ source: '_cmd_version.go', target: 'cmd/version.go', ctx: getCtxFunc() },
  //{ source: '_cmd_version_test.go', target: 'cmd/version_test.go', ctx: getCtxFunc() },
]


function getUserNameAndEmail(callback) {
  // executes `pwd`
  var cmd = "git config --global user.email"
  var child = exec(cmd, function (error, stdout, stderr) {
    let userName, userEmail
    if (error == null) {
      userEmail = stdout.replace('\n', '');
    }

    cmd = "git config --global user.name"
    child = exec(cmd, function (error, stdout, stderr) {
      if (error == null) {
        userName = stdout.replace('\n', '');
      }

      callback(userName, userEmail);
    });
  });
}

function guessPackageURL(answers) {
  var emailParts = answers.authorEmail.split('@');
  if (emailParts.length > 1) {
    return 'https://github.com/' + emailParts[0] + '/' + answers.packageName
  }
  return 'https://github.com/someuser/somepackage';
}

function getUsername(email) {
  var emailParts = email.split('@');
  if (emailParts.length > 1) {
    return emailParts[0]
  }
  return '';
}


function escapeQuotes(answer) {
  return answer.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

var JS12Generator = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.pkg = require('../package.json')
    this.packageContents = packageContents
  },

  prompting: function () {
    var done = this.async()
    var self = this
    self.log(yosay('Welcome to JS12!!!\n\nRun this generator in your app folder\n(inside $GOPATH)'))

    getUserNameAndEmail(function(userName, userEmail) {
      var prompts = [{
        type: 'input',
        name: 'packageName',
        message: 'Package name (the name that will be used in npm):',
        default: path.basename(process.cwd())
      }, {
        type: 'input',
        name: 'authorName',
        message: 'Package author name:',
        default: userName,
        filter: escapeQuotes
      }, {
        type: 'input',
        name: 'authorEmail',
        message: 'Package author email:',
        default: userEmail
      }, {
        type: 'input',
        name: 'description',
        message: 'Description (will be used in the CLI):',
        default: 'Awesome new node.js package',
      }, {
        type: 'input',
        name: 'version',
        message: 'Package initial version:',
        default: '0.1.0'
      }, {
        type: 'input',
        name: 'url',
        message: 'Package url (this url will be used for all imports):',
        default: guessPackageURL
      }, {
        type: 'input',
        name: 'license',
        message: 'Package license:',
        default: 'MIT',
        filter: escapeQuotes
      }]

      return self.prompt(prompts).then(function (props) {
        var nodePackageName = props.packageName.replace(/(\s|-)+/g, '_');

        self.package = {
          name: props.packageName,
          description: props.description,
          packageName: nodePackageName,
          importName: props.url.replace('http://', '').replace('https://', ''),
          author: {
            username: getUsername(props.authorEmail),
            name: props.authorName,
            email: props.authorEmail
          },
          version: props.version,
          url: props.url,
          license: props.license,
          created: {
            day: new Date().getDay(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
          },
          services: {
            HTTP: {
              require: false,
            },
            redis: {
              require: false,
            },
            mongo: {
              require: false,
            },
            postgre: {
              require: false,
            },
            mysql: {
              require: false,
            },
            nats: {
              require: false,
            },
          },
        }
        done()
      })
    })
  },

  writing: function () {
    this._writeSource()
  },

  _writeSource: function() {
    for (var i=0; i < this.packageContents.length; i++) {
      const item = this.packageContents[i]
      this.template(item.source, item.target, item.ctx(this))
    }
    //this.template('_main.go', 'main.go', this.package)
    //this.template('_main_test.go', 'main_test.go', this.package)
    //this.template('_suite_test.go', 'main_suite_test.go', Object.assign({ pkg: 'main', title: 'Main' }, this.package))

    //this.template('_suite_test.go', 'metadata/metadata_suite_test.go', Object.assign({ pkg: 'metadata', title: 'Metadata' }, this.package))
    //this.template('_metadata_version.go', 'metadata/version.go', this.package)
    //this.template('_metadata_version_test.go', 'metadata/version_test.go', this.package)

    //this.template('_suite_test.go', 'cmd/cmd_suite_test.go', Object.assign({ pkg: 'cmd', title: 'Commands' }, this.package))
    //this.template('_cmd_helpers_test.go', 'cmd/helpers_test.go', this.package)
    //this.template('_cmd_root.go', 'cmd/root.go', this.package)
    //this.template('_cmd_root_test.go', 'cmd/root_test.go', this.package)
    //this.template('_cmd_version.go', 'cmd/version.go', this.package)
    //this.template('_cmd_version_test.go', 'cmd/version_test.go', this.package)
  },

  _getUsageMessage: function() {
    var pkg = this.package
    console.log(this.package)
    //this.log("\n\nNow that your project is all created, here is what the make commands can do for you!\n");
    //this.log("General commands:");
    //this.log('* "make list" to list all available targets;');

    //this.log('* "make setup" to install all dependencies (do not forget to create a virtualenv first);');
    //this.log('* "make test" to test your application (tests in the tests/ directory);');

    //if (pkg.services.redis) {
      //this.log("\nRedis commands:");
      //this.log('* "make redis" to get a redis instance up (localhost:4444);');
      //this.log('* "make kill-redis" to kill this redis instance (localhost:4444);');
      //this.log('* "make redis-test" to get a redis instance up for your unit tests (localhost:4448);');
      //this.log('* "make kill-redis-test" to kill the test redis instance (localhost:4448);');
    //}

    //if (pkg.services.mongodb) {
      //this.log("\nMongoDB commands:");
      //this.log('* "make mongo" to get a mongodb instance up (localhost:3333);');
      //this.log('* "make kill-mongo" to kill this mongodb instance (localhost:3333);');
      //this.log('* "make clear-mongo" to clear all data in this mongodb instance (localhost: 3333);');
      //this.log('* "make mongo-test" to get a mongodb instance up for your unit tests (localhost:3334);');
      //this.log('* "make kill-mongo-test" to kill the test mongodb instance (localhost: 3334);');
    //}

    //this.log('* "make tox" to run tests against all supported python versions.');
  },

});

module.exports = JS12Generator
