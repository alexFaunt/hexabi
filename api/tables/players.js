
export default `CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    member integer references members(id),
    position integer,
    hand text,
    focus boolean DEFAULT FALSE,
    finished boolean DEFAULT FALSE
);`;
