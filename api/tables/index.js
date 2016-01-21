const map = new Map();
// using map as they need to be in the right order

// Tables
import * as members from './members'; map.set('members', members);
import * as games from './games'; map.set('games', games);
import * as players from './players'; map.set('players', players);
import * as turns from './turns'; map.set('turns', turns);
import * as login from './login'; map.set('login', login);

// Join tables
// import * as games_players from './games_players'; map.set('games_players', games_players);
// import * as games_players_turns from './games_players_turns'; map.set('games_players_turns', games_players_turns);

export default map;
