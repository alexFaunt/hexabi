import database from '../database';
import PlayerModel from './PlayerModel';
import MemberModel from './MemberModel';

export default database.Model.extend({
	tableName: 'games',
	players: function () {
		return this.hasMany(PlayerModel);
	},
	creator: function () {
		return this.belongsTo(MemberModel, 'creator');
	}
});
