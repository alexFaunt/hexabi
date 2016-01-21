import database from '../database';
import GameModel from './GameModel';
import PlayerModel from './PlayerModel';

export default database.Model.extend({
	tableName: 'games_players',
	game: function () {
		return this.belongsTo(GameModel);
	},
	player: function () {
		return this.belongsTo(PlayerModel);
	}
});
