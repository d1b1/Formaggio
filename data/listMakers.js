process.env.TAKESHAPE_KEY = 'b9175c9ccad64c929eaafcc1e7a0e16a';
process.env.TAKESHAPE_PROJECTID = '733a9f1a-977f-4637-bc04-8ad63d8ac13a';

var async = require('async')
var data = require('./makers.json')
var _ = require('underscore')
var takeshape = require('../heroku/services/takeshape');

var results = data.results;
// console.log(results.length);
// return

var getType = (type) => {
	if (!type) return []
	var type = type.replace(/ /g, ',').replace(',,', ',').replace(',,', ',').split(',')
	var data = []
	_.each(type, t => { data.push(`"${t}"`) })
	return data;
}

var badIds = []
var q = async.queue(function(task, callback) {

	takeshape(task.query, null).then((res) => {
		if (res.errors) {
			badIds.push(task._id)
			console.log('Query', task.query)
			console.log('Error', task._id, res.errors);
		} else {
				console.log('Inserted', task.idx, task._id);
		}

		callback();
	})

}, 10);

// assign a callback
q.drain(function() {
	console.log('All Done');
	console.log(badIds.length, badIds);
});


var i = 0
_.each(results, (item, idx) => {
		i++
	  if (item.name) {
			var typeArray = getType(item.type)
			var desc = (item.description || '').replace('"', '')
			var query = `
			  mutation {
					createAgent(input: {
						name: "${item.name}",
						secondaryName: "${item.farm || ''}",
						description: "${item.desc || ''}",
						hoursOfOperation: "${item.hours || ''}",
						_id: "${item._id}",
						operators: "${item.contact_name || ''}",
						type: [${typeArray}],
						websiteUrl: "${item.website || ''}",
						email: "${item.email || ''}",
						phone: "${item.phone || ''}",
						assets: {
							logoUrl: "${item.logourl || ''}"
						},
						location: {
							city: "${item.city || ''}",
							state: "${item.state || ''}",
							country: "${item.country || ''}",
							zipOrPostalCode: "${item.zipcode || ''}"
						},
						socialMedia: {
							twitter: "${item.twitter || ''}",
							facebook: "${item.facebook || ''}"
						},
						geoLocation: {
							lat: ${item.location.lat || 0},
							lng: ${item.location.lng || 0}
						}
					})
					{
						result {
							_id
							name
						}
					}
				}
			`
			q.push({ idx: i, _id: item._id, data: item, query: query })
	} else {
		console.log('Missing name', item.name, item.description, item.farm, item);
	}

})
