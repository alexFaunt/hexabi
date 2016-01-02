
export const up = function (table) {
	table.integer('game_id').notNullable().references('id').inTable('games');
	table.integer('player_id').notNullable().references('id').inTable('players');
	table.integer('turn_id').notNullable().references('id').inTable('turns');
};

// export create = `CREATE TABLE games_players (
//	 game_id integer NOT NULL references games(id),
//	 player_id integer NOT NULL references players(id)
//	 turn_id integer NOT NULL references turns(id)
// );`;
