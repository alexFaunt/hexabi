// set up config
import config from '../server-config.js';

import knex from 'knex';
import bookshelf from 'bookshelf';

const knexConfig = knex({
    client: 'pg',
    connection: config.postgres
});

export default bookshelf(knexConfig);
