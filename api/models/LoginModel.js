import database from '../database';
import MemberModel from './MemberModel';

export default database.Model.extend({
	tableName: 'login',
	member: function () {
		return this.belongsTo(MemberModel, 'member');
	}
});
