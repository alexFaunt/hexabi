const map = new Map();
// using map as they need to be in the right order

// Tables
import * as membersTable from './membersTable'; map.set('members', membersTable);
import * as gamesTable from './gamesTable'; map.set('games', gamesTable);
import * as playersTable from './playersTable'; map.set('players', playersTable);
import * as turnsTable from './turnsTable'; map.set('turns', turnsTable);
import * as loginTable from './loginTable'; map.set('login', loginTable);

// Join tables
// import * as games_players from './games_players'; map.set('games_players', games_players);
// import * as games_players_turns from './games_players_turns'; map.set('games_players_turns', games_players_turns);

export default map;
