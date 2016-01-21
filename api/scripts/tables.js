// I DONT UNDERSTAND KNEX SO THIS IS SOOO BAD, but who cares, you barely need it.

import config from '../../server/config/server-config.js';

import knex from 'knex';

import tables from '../tables';

const method = process.argv[2];

process.stdin.resume();
process.stdin.setEncoding('utf8');
console.log('You are about to run ' + method + ' against all tables, are you sure?');
process.stdin.on('data', function (text) {
	if (text === 'yes\n') {
		perform();
	}
	else {
		quit();
	}
});

function quit () {
	console.log('aborted');
	process.exit();
}

function perform () {
	console.log('running', method, 'for all tables');

	const database = knex({
		client: 'pg',
		connection: config.postgres,
		debug: true
	});

	let schema = database.schema;

	let useSchema = true;
	let prom = Promise.resolve();

	const methods = {
		up: function (name, def) {
			return schema.createTableIfNotExists(name, def);
		},
		down: function (name) {
			return schema.raw(`DROP TABLE IF EXISTS ${ name } CASCADE`);
		},
		pop: function (name, data) {
			useSchema = false;
			if (!data) {
				return schema;
			}

			data.forEach((item) => {
				prom = prom.then(function () {
					return database.insert(item).into(name);
				});
			});
			return schema;
		}
	};

	for (const [ table, defs ] of tables) {
		console.log(' DO UPDATE, ', table);
		schema = methods[method](table, defs[method]);
	}

	if (useSchema) {
		schema.then(function () {
			console.log('all done!');
			process.exit();
		}, function (err) {
			console.log('it fucked up');
			console.error(err);
			console.log(err.stack);
			process.exit();
		});
	}
	else {
		// console.log('proms', proms);
		prom.then(function () {
			console.log('done');
			process.exit();
		}, function (err) {
			console.log('err', err);
			process.exit();
		});
	}
}
