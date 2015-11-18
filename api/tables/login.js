
export default `CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    member integer references members(id),
    username text NOT NULL,
    secret text NOT NULL
);`;
