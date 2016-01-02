
export default class Enum {
	constructor (values) {
		values.forEach((value, idx) => {
			this[value] = idx;
			this[idx] = value;
		});
	}
}
