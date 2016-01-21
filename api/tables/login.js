import bcrypt from 'bcrypt';

export const up = function (table) {
	table.increments();
	table.integer('member').references('id').inTable('members');
	table.text('username').notNullable();
	table.text('secret').notNullable();
	table.timestamps();
};

export const pop = [
	{
		id: 1,
		member: '1',
		username: 'user1',
		secret: bcrypt.hashSync('pass', 10)
	},
	{
		id: 2,
		member: '2',
		username: 'user2',
		secret: bcrypt.hashSync('pass', 10)
	},
	{
		id: 3,
		member: '3',
		username: 'user3',
		secret: bcrypt.hashSync('pass', 10)
	},
	{
		id: 4,
		member: '4',
		username: 'user4',
		secret: bcrypt.hashSync('pass', 10)
	},
	{
		id: 5,
		member: '5',
		username: 'user5',
		secret: bcrypt.hashSync('pass', 10)
	},
	{
		id: 6,
		member: '6',
		username: 'user6',
		secret: bcrypt.hashSync('pass', 10)
	}
];
