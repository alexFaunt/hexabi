import database from '../database'
import Member from './Member';

export default database.Model.extend({
    tableName: 'providers',
    member: function () {
        return this.belongsTo(Member, 'member');
    }
});
