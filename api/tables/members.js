export const up = function (table) {
	table.increments();
	table.text('name').notNullable();
	table.text('avatar');
	table.timestamps();
};

export const pop = [
	{ id: 1, name: 'Chandler Bing' },
	{ id: 2, name: 'Rachel Green' },
	{ id: 3, name: 'Ross Geller' },
	{ id: 4, name: 'Monica Geller' },
	{ id: 5, name: 'Phoebe Buffay' },
	{ id: 6, name: 'Joey Tribbiani' }
];
