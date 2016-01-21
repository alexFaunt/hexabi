import ApiKeywords from '../../enums/ApiKeywords';

export default () => (req, res, next) => {
	const { auth, body } = req;

	if (auth && auth.member) {
		req.body = body.replace(ApiKeywords.CURRENT_USER_ID, auth.member.id);
	}

	next();
};
