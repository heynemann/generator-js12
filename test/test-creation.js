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
        const dir = fs.mkdtempSync('/tmp/js12')
        return helpers.
          run(path.join(__dirname, '../app')).
          on('ready', function (generator) {
            self.generator = generator
          }).
          inDir(path.join(dir, 'test-package')).
          withPrompts({
            packageName: 'test-package',
            description: 'an incredible node package',
            keywords: 'test package',
            authorName: 'Bernardo Heynemann',
            authorEmail: 'heynemann@gmail.com',
            url: 'https://github.com/heynemann/test-package',
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

      it('runs setup', function(done) {
        this.timeout(30000);
        runBinary('make setup', function(error, stdout, stderr) {
          expect(error).to.be.null
          done()
        });
      })

      //it('runs tests', function(done) {
        //this.timeout(30000);
        //runBinary('make setup test', function(error, stdout, stderr) {
          //expect(error).to.be.null

          //expect(getCoverage(stdout)).to.equal(100.0)
          //done()
        //});
      //})
    })
  })
})
