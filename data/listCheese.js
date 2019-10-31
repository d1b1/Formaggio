process.env.TAKESHAPE_KEY = 'b9175c9ccad64c929eaafcc1e7a0e16a';
process.env.TAKESHAPE_PROJECTID = '733a9f1a-977f-4637-bc04-8ad63d8ac13a';

var async = require('async')
var titleCase = require('title-case');
var data = require('./cheese.json')
var _ = require('underscore')
var takeshape = require('../heroku/services/takeshape');

var results = data.results;
console.log(results.length);

var getRennet = (type) => {
	switch (type) {
		case 'Microbial':
		case 'Microbnial':
		case 'Vegetarian, microbial':
		case 'Microbial Rennet':
			return 'Microbial';
			break;
		// --------------------
		case 'asdasdsxxx':
		case 'Animal':
		case 'Animal RennetE':
		case 'Animal Rennet':
		case 'Traditional':
		case 'Traditional Rennet':
		case 'True Vegetable':
			return 'Traditional Rennet';
			break;
		// --------------------
		case 'Chymosin':
			return 'Chymosin';
			break;
		// --------------------
		case 'True Vegetable':
		case 'Vegetarian':
	  case 'Vegetable':
	  case 'Vegetable Rennet':
			return 'Vegetable';
			break;
		// --------------------
		default:
			return type;
	}

}
var getCovering = (type) => {

	switch (type) {
		case "Washed Rind":
		case "Washed and Brushed":
		case "Cold Water Washed":
		case "Washed in Brine":
		case "Washed":
			return "Washed";
			break;
		//----------------
		case "Fresh":
		case "Natural Rind":
		case "Natural":
			return "Natural";
			break;
		//----------------
		case "Bloomy Rind":
		case "Bloomy":
		case "Bloomy - Herb Encrusted":
			return "Bloomy Rind";
			break;
		//----------------
		case "Mold-Ripened":
		case "Mold Ripened":
			return "Mold Ripend";
			break;
		//----------------
		case "Washed with St-Ambroise beer":
		case "Wash Rind":
		case "Mixed Milk Washed Rind":
		case "Washed-Rind":
			return "Washed Rind";
			break;
		//----------------
		case "Herb Coated":
			return "Herb Coated";
			break;
		//----------------
		case "Waxed":
			return "Waxed";
			break
		//----------------
		case "Plasticoat":
		case "Plastic":
			return "Plastic";
			break;
		//----------------
		case "Ash Covrd":
		case "Ash coated":
		case "Vegetable Ash":
		case "Ash":
		case "Ashed":
			return "Ash Rind";
			break;
		//----------------
		case "Mixed Rind":
		case "Mixed":
		case "Geotricum":
		case "Water":
		case "Mould Rind":
		case "Coloured":
		case "None":
		case "Blue":
		case "Cave-Aged":
		case "Smear Ripened":
			return "None";
			break;
		//----------------
		case "Coloured Orange":
		case "Coloured Yellow":
		case "Coloured black":
		case "Waxed":
			return "Waxed";
			break;
		//----------------
		case "Smoked":
			return "Smoked";
			break;
		//----------------
		case "Clothbound":
		case "Cloth bound Natural":
		case "Cloth Wrapped":
		case "Bandaged":
			return "Cloth Wrapped";
			break;
		//----------------
		case "Oakwood Smoked Natural-Rind":
		case "Bark-Wrapped Bloomy":
		case "Bark-Wrapped Bloomy":
			return "Bark Wrapped";
			break;
		//----------------
		case "Leaf Wrapped":
		case "grapeleaf ash":
			return "Leaf Wrapped";
			break;
		//----------------
		case "Rindless":
			return "Rindless";
			break;
		//----------------
		case "Paprika":
		case "Cocoa":
		case "Flavored":
		case "Herbs":
		case "Flavor Added":
			return "Flavored";
			break;
		//----------------
		default:
			return type;
	}

}

var getMilk = (type) => {
	if (!type) return []

	switch (type) {
		case 'cow ewe & goat':
			return [ 'Cow', 'Ewe', 'Goat' ]
			break;
		case 'Cow & Sheep':
			return [ 'Cow', 'Sheep' ]
			break;
		case 'ewe goat':
		case 'ewe & goat':
			return [ 'Goat', 'Ewe' ]
			break;
		case 'Cow & Goat':
		case 'cow & goat':
			return [ 'Cow', 'Goat' ]
			break;
		case 'cow & ewe':
			return [ 'Cow', 'Ewe' ]
			break;
		case 'cow & buffalo':
			return [ 'Cow', 'Buffalo' ]
			break;
		case 'cow & camel':
			return [ 'Cow', 'Camel' ]
			break;
		case 'cow & reindeer':
			return [ 'Cow', 'Reindeer' ]
			break;
		case 'Goat & Sheep':
			return [ 'Goat', 'Sheep']
			break;
		case 'Goat & Sheep & Cow':
		case 'cow, sheep, goat':
			return [ 'Cow', 'Sheep', 'Goat' ]
			break;
		case 'Goat Sheep':
			return ['Goat', 'Sheep']
			break;
		case 'goats':
			return [ 'Goat' ]
			break;
		default:
			return [ titleCase(type)  ]
	}

}

var badIds = []
var q = async.queue(function(task, callback) {

	takeshape(task.query, null).then((res) => {
		if (res.errors) {
			badIds.push(task._id)
			console.log('Query', task.query)
			console.log('Error', task._id, res.errors[0]);
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

			var rennet = getRennet(item.rennet);
			var milk = getMilk(item.source)

			var milkData = []
			_.each(milk, t => { milkData.push(`"${t}"`) })

			var covering = getCovering(item.rind);
			// var coveringData = []
			// _.each(covering, t => { coveringData.push(`"${t}"`) })

			var desc = (item.description || '').replace('"', '')
			var query = `
			  mutation {
					createCheese(input: {
						_id: "${item._id}",
						name: "${item.name}",
						description: "${ item.desc || '' }",
						source: "${ item.region || '' }, ${ item.country || '' }",
						characteristics: {
							fatContent: "${ item.fat_content || '' }",
							covering: [ "${covering || 'NA' }" ],
							aged: "${ item.aging_time || '' }",
							rennetType: [ "${ rennet || 'NA' }" ],
							milk: [ ${milkData} ],
							texture: [ "${ item.texture || 'NA' }" ],
						},
						logoUrl: "${ item.image || '' }",
						location: {
							region: "${ item.region || '' }",
							country: "${ item.country || '' }",
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
			console.log('Missing name', item.name, item.description, item);
		}

})
