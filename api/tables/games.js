
export const up = function (table) {
	table.increments();
	table.integer('creator').notNullable().references('id').inTable('members');
	table.integer('status').notNullable();
	table.integer('score');
	table.integer('lives');
	table.integer('infos');
	table.text('deck');
	table.text('played');
	table.text('discard');
	table.text('name');
	table.text('secret');
	table.timestamps();
};

export const pop = [
	{
		creator: 1,
		status: 0,
		score: 0,
		lives: 3,
		infos: 8,
		deck: null,
		played: null,
		discard: null,
		name: 'Test game 1',
		secret: 'password'
	},
	{
		creator: 2,
		status: 0,
		score: 0,
		lives: 3,
		infos: 8,
		deck: null,
		played: null,
		discard: null,
		name: 'Test game 2',
		secret: null
	},
	{
		creator: 1,
		status: 0,
		score: 0,
		lives: 3,
		infos: 8,
		deck: null,
		played: null,
		discard: null,
		name: 'Test game 3',
		secret: null
	}
];
