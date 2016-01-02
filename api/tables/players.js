export const up = function (table) {
	table.increments();
	table.integer('member').notNullable().references('id').inTable('members');
	table.integer('position');
	table.text('hand');
	table.boolean('focus').defaultTo(false);
	table.boolean('finished').defaultTo(false);
	table.timestamps();
};

export const pop = [
	{
		member: '1',
		position: '0',
		hand: null,
		focus: true,
		finished: false
	},
	{
		member: '3',
		position: '1',
		hand: null,
		focus: false,
		finished: false
	},
	{
		member: '4',
		position: '2',
		hand: null,
		focus: false,
		finished: false
	},
	{
		member: '2',
		position: '0',
		hand: null,
		focus: true,
		finished: false
	},
	{
		member: '3',
		position: '1',
		hand: null,
		focus: false,
		finished: false
	},
	{
		member: '1',
		position: '0',
		hand: null,
		focus: true,
		finished: false
	}
];
