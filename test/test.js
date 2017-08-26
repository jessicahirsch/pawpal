
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://api.petfinder.com/pet.getRandom?key=402d3f8b4c52d0fd052d8030dd0b5d41&output=full&format=json";
var util = require("util");
const axios = require('axios');

describe('returns a {}', function() {
    it('returns a {}', function(done) {
        request.get({ url: baseUrl },
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);
                  expect(response.statusCode).to.equal(200);
                    console.log(body);
                done();
            });
    });
});
