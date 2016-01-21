import database from '../database';

import PlayerModel from './PlayerModel';
import GameModel from './GameModel';

export default database.Model.extend({
	tableName: 'members',
	createdGames: function () {
		return this.hasMany(GameModel, 'creator');
	},
	players: function () {
		return this.hasMany(PlayerModel);
	},
	playingGames: function () {
		return this.belongsToMany(GameModel).through(PlayerModel);
	}
});
