import GameStatus from '../../enums/GameStatus';

export default {
	title: 'Hexabi',
	tagLine: 'Some you win, some you lose.',

	login: 'login',

	termsTitle: 'Terms and Conditions',
	contactTitle: 'Contact us',

	gameStatus: {
		[GameStatus.PENDING]: 'Pending',
		[GameStatus.PLAYING]: 'Playing',
		[GameStatus.FINISHED]: 'Finished'
	}
};
