
export default `CREATE TABLE games_players (
    game_id integer NOT NULL references games(id),
    player_id integer NOT NULL references players(id)
);`;
