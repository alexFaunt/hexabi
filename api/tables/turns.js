export const up = function (table) {
	table.increments();
	table.integer('type').notNullable();
	table.text('card');
	table.text('info');
	table.integer('target').references('id').inTable('players');
	table.timestamps();
};
