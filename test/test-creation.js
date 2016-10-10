/*global describe, beforeEach, it */
'use strict';
const path = require('path')
const fs = require('fs')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert');
const chai = require('chai')
const expect = chai.expect;
const exec = require('child_process').exec;

const runBinary = function(command, cb) {
  exec(command, cb)
}

const getCoverage = function(stdout) {
  console.log(stdout)
  const re = /(?:coverage[:]\s*(\d+[.]\d+)[%])/gi
  let coverage = 0
  let coverageCount = 1
  let result = re.exec(stdout)
  while (result) {
    coverage += parseFloat(result[1])
    coverageCount++
    result = re.exec(stdout)
  }

  return coverage / Math.max(coverageCount - 1, 1)
}

describe('js12 generator', function () {
  describe('main command', function() {
    describe('without services', function() {
      beforeEach(function () {
        const self = this
        self.dir = fs.mkdtempSync('/tmp/js12')
        return helpers.
          run(path.join(__dirname, '../app')).
          on('ready', function (generator) {
            self.generator = generator
          }).
          inDir(path.join(self.dir, 'test-package')).
          withPrompts({
            packageName: 'test-package',
            description: 'an incredible node package',
            keywords: ' test, package    ',
            authorName: 'Bernardo Heynemann',
            authorEmail: 'heynemann@gmail.com',
            url: 'https://github.com/heynemann/test-package',
            repo: 'https://github.com/heynemann/test-package.git',
            license: 'MIT',
            services: [],
          }).toPromise()
      })

      it('creates expected files', function () {
        var expected = [];
        for (var i=0; i < this.generator.packageContents.length; i++) {
          const item = this.generator.packageContents[i]
          expected.push(item.target)
        }

        assert.file(expected)
      })

      it('has proper package info', function(done) {
        const pkg = require(path.join(this.dir, 'test-package/package.json'))
        expect(pkg.name).to.equal('test-package')
        expect(pkg.description).to.equal('an incredible node package')
        expect(pkg.version).to.equal('0.1.0')
        expect(pkg.repository.type).to.equal('git')
        expect(pkg.repository.url).to.equal('git+https://github.com/heynemann/test-package.git')

        expect(pkg.keywords).to.length(2)
        expect(pkg.keywords[0]).to.equal('test')
        expect(pkg.keywords[1]).to.equal('package')

        expect(pkg.author).to.equal('Bernardo Heynemann <heynemann@gmail.com>')
        expect(pkg.license).to.equal('MIT')

        expect(pkg.homepage).to.equal('https://github.com/heynemann/test-package')
        expect(pkg.bugs.url).to.equal('https://github.com/heynemann/test-package/issues')
        done()
      })

      describe('with mocha', function() {
        it('runs tests', function(done) {
          this.timeout(120000);
          runBinary('make setup test', function(error, stdout, stderr) {
            expect(error).to.be.null
            expect(getCoverage(stdout)).to.equal(100.0)
            done()
          })
        })
      })
    })
  })
})
