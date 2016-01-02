import database from '../database';
import Player from './Player';
import Member from './Member';

export default database.Model.extend({
	tableName: 'games',
	players: function () {
		return this.belongsToMany(Player);
	},
	creator: function () {
		return this.belongsTo(Member, 'creator');
	}
});
