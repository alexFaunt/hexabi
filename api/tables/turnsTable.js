export const up = function (table) {
	table.increments();
	table.integer('type').notNullable();
	table.integer('game_id').notNullable().references('id').inTable('games');
	table.integer('player_id').references('id').inTable('players');
	table.text('card');
	table.text('info');
	table.timestamps();
};
