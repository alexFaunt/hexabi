import database from '../database'
import Game from './Game';
import Player from './Player';

export default database.Model.extend({
    tableName: 'games_players',
    game: function () {
        return this.belongsTo(Game);
    },
    player: function () {
        return this.belongsTo(Player);
    }
});
