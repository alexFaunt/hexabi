import api from '../../api';

export default function ({ auth, body }, res) {
	// TODO - move the auth to the queries + mutations
	// Do it by groups (bookshelf has some)
	if (!auth) {
		return res.status(401).send(JSON.stringify({ result: 'failure' }));
	}
	console.log('API', body);
	api(
		body,
		({ data, errors }) => {
			if (errors) {
				console.log(errors);
				return res.status(500).send(errors);
			}

			res.status(200).send(JSON.stringify(data, null, 2));
		},
		({ message }) => res.status(500).send(message)
	);
}
