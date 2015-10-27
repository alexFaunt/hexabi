
export default `CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    status text NOT NULL DEFAULT 'PENDING',
    lives integer DEFAULT 3,
    infos integer DEFAULT 8,
    deck text,
    played text,
    discard text,
    creator integer NOT NULL references members(id)
);`;
