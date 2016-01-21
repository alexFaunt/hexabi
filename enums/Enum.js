
export default class Enum {
	constructor (values) {
		values.forEach((value) => {
			this[value] = value;
		});
	}
}
