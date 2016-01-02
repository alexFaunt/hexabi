export const up = function (table) {
	table.increments();
	table.text('name').notNullable();
	table.text('avatar');
	table.timestamps();
};

export const pop = [
	{ name: 'Chandler Bing' },
	{ name: 'Rachel Green' },
	{ name: 'Ross Geller' },
	{ name: 'Monica Geller' },
	{ name: 'Phoebe Buffay' },
	{ name: 'Joey Tribbiani' }
];
