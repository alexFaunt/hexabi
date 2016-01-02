export const up = function (table) {
	table.increments();
	table.integer('member').references('id').inTable('members');
	table.text('username').notNullable();
	table.text('secret').notNullable();
	table.timestamps();
};

export const pop = [
	{
		member: '1',
		username: 'user1',
		secret: 'pass'
	},
	{
		member: '2',
		username: 'user2',
		secret: 'pass'
	},
	{
		member: '3',
		username: 'user3',
		secret: 'pass'
	},
	{
		member: '4',
		username: 'user4',
		secret: 'pass'
	},
	{
		member: '5',
		username: 'user5',
		secret: 'pass'
	},
	{
		member: '6',
		username: 'user6',
		secret: 'pass'
	}
];
