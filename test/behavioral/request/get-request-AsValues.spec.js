var jsong = require("../../../index");
var Model = jsong.Model;
var Rx = require("rx");
var LocalDataSource = require("../../data/LocalDataSource");
var UnoDataSource = require("../../data/UnoDataSource");
var Cache = require("../../data/Cache");
var RCache = require("../../data/ReducedCache");
var Expected = require("../../data/expected");
var getTestRunner = require("../../getTestRunner");
var testRunner = require("../../testRunner");
var References = Expected.References;
var Complex = Expected.Complex;
var Values = Expected.Values;
var chai = require("chai");
var expect = chai.expect;
var noOp = function() {};

function getDataModel(cache) {
    return testRunner.getModel(new LocalDataSource(Cache()), cache || {});
}

describe("AsValues", function() {
    it("should get a value from the dataSource", function(done) {
        debugger
        var expected = References().simpleReference0;
        var dataModel = getDataModel();
        var obs = dataModel.
            get(["genreList", 0, 0, "summary"]).
            toPathValues();
        getTestRunner.
            async(obs, dataModel, expected, {
                onNextExpected: expected.AsValues
            }).
            subscribe(noOp, done, done);

    });

    it("should get a complex value from the dataSource", function(done) {
        var expected = Complex().toOnly;
        var dataModel = getDataModel();
        var obs = dataModel.
            get(["genreList", 0, {to:1}, "summary"]).
            toPathValues();
        getTestRunner.
            async(obs, dataModel, expected, {
                onNextExpected: expected.AsValues
            }).
            subscribe(noOp, done, done);
    });

    it("should get a complex value from the cache and the dataSource", function(done) {
        var expected = Complex().toOnly;
        var dataModel = getDataModel(RCache.MinimalCache());
        var obs = dataModel.
            get(["genreList", 0, {to:1}, "summary"]).
            toPathValues();
        getTestRunner.
            async(obs, dataModel, expected, {
                onNextExpected: expected.AsValues
            }).
            subscribe(noOp, done, done);
    });
});
