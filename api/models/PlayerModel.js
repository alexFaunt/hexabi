import database from '../database';
import MemberModel from './MemberModel';
import GameModel from './GameModel';

export default database.Model.extend({
	tableName: 'players',
	member: function () {
		return this.belongsTo(MemberModel);
	},
	game: function () {
		return this.belongsTo(GameModel);
	}
});
