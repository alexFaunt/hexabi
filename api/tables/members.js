
export default `CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    avatar text,
    score integer DEFAULT 0
);`;
