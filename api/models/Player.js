import database from '../database';
import Member from './Member';
import Game from './Game';

export default database.Model.extend({
	tableName: 'players',
	member: function () {
		return this.belongsTo(Member);
	},
	game: function () {
		return this.belongsTo(Game);
	}
});
