process.env.TAKESHAPE_KEY = '1c372ec850af4f1180db4290bba0850b';
process.env.TAKESHAPE_PROJECTID = '733a9f1a-977f-4637-bc04-8ad63d8ac13a';

const _ = require('underscore')
const takeshape = require('../services/takeshape')

var query = `
{
  __type(name: "Cheese") {
    name
    fields {
      name
      type {
        name
        kind
				ofType {
          name
          kind
        }
      }
    }
  }
}
	`


takeshape(query).then(result => {
	var t = {}

	_.each(result.data.__type.fields, field => {
		console.log('');
		console.log(field.type.name, field);

		switch (field.type.kind) {
			case 'SCALAR':
				t[field.name] = '1'
				break;
			case 'ID':
				t[field.name] = '1'
				break;
			case 'OBJECT':
				t[field.name] = 'GET MORE'
			default:

		}

	})

	console.log('');
	console.log(t);
})
