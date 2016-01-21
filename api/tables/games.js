import GameStatus from '../../enums/GameStatus';

export const up = function (table) {
	table.increments();
	table.integer('creator').notNullable().references('id').inTable('members');
	table.text('status').notNullable();
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
		id: 1,
		creator: 1,
		status: GameStatus.PLAYING,
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
		id: 2,
		creator: 2,
		status: GameStatus.PLAYING,
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
		id: 3,
		creator: 1,
		status: GameStatus.PENDING,
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
