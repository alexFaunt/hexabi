import styles from './GameTableRow.css';

import React, { Component } from 'react';

import lexums from '../../content/lexums';

export default class GameTableRow extends Component {

	render () {
		return (
			<tr id={ this.props.game.id }>
				<td>{ this.props.game.creator.name }</td>
				<td>{ this.props.game.name }</td>
				<td>{ lexums.gameStatus[this.props.game.status] }</td>
				<td>{ this.props.game.players.length }</td>
			</tr>
		);
	}

}
