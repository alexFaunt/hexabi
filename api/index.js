import { graphql } from 'graphql';
import schema from './schema';

export default (request, success, failure) => graphql(schema, request).then(success).catch(failure);
