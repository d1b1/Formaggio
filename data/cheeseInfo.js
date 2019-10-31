var data = require('./cheese.json')
var _ = require('underscore')

var results = data.results;
console.log(results.length, results[2]);

var source = _.chain(results).pluck('covering').unique().value();
console.log(source);
