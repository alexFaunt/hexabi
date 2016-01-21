export const up = function (table) {
	table.increments();
	table.integer('member_id').notNullable().references('id').inTable('members');
	table.integer('game_id').notNullable().references('id').inTable('games');
	table.integer('position');
	table.text('hand');
	table.boolean('focus').defaultTo(false);
	table.boolean('finished').defaultTo(false);
	table.timestamps();
};

export const pop = [
	{
		id: 1,
		member_id: '1',
		game_id: 1,
		position: '0',
		hand: null,
		focus: true,
		finished: false
	},
	{
		id: 2,
		member_id: '3',
		game_id: 1,
		position: '1',
		hand: null,
		focus: false,
		finished: false
	},
	{
		id: 3,
		member_id: '4',
		game_id: 1,
		position: '2',
		hand: null,
		focus: false,
		finished: false
	},
	{
		id: 4,
		member_id: '2',
		game_id: 2,
		position: '0',
		hand: null,
		focus: true,
		finished: false
	},
	{
		id: 5,
		member_id: '3',
		game_id: 2,
		position: '1',
		hand: null,
		focus: false,
		finished: false
	},
	{
		id: 6,
		member_id: '5',
		game_id: 2,
		position: '0',
		hand: null,
		focus: true,
		finished: false
	},
	{
		id: 7,
		member_id: '1',
		game_id: 3,
		position: '0',
		hand: null,
		focus: true,
		finished: false
	}
];
