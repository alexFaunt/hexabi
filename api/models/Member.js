import database from '../database';

import Player from './Player';
import Game from './Game';

export default database.Model.extend({
	tableName: 'members',
	createdGames: function () {
		return this.hasMany(Game, 'creator');
	},
	players: function () {
		return this.hasMany(Player);
	},
	playingGames: function () {
		return this.belongsToMany(Game).through(Player);
	}
});
