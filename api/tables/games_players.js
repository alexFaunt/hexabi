
export const up = function (table) {
	table.integer('game_id').notNullable().references('id').inTable('games');
	table.integer('player_id').notNullable().references('id').inTable('players');
};

export const pop = [
	{
		game_id: '1',
		player_id: '1'
	},
	{
		game_id: '1',
		player_id: '3'
	},
	{
		game_id: '1',
		player_id: '4'
	},
	{
		game_id: '2',
		player_id: '2'
	},
	{
		game_id: '2',
		player_id: '2'
	},
	{
		game_id: '2',
		player_id: '3'
	},
	{
		game_id: '3',
		player_id: '1'
	}
];
