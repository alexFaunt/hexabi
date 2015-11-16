import config from '../server/config/server-config.js';

import knex from 'knex';
import bookshelf from 'bookshelf';

const knexConfig = knex({
    client: 'pg',
    connection: config.postgres,
    debug: true
});

export default bookshelf(knexConfig);
