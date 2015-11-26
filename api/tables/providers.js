
export default `CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    member integer references members(id),
    type text
);`;

const insert = `INSERT INTO providers (member, type) VALUES (2, 'hairdresser');`;
