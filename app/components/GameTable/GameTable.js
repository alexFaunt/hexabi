import styles from './GameTable.css';

import React, { Component } from 'react';

import GameTableRow from '../GameTableRow/GameTableRow';

export default class GameTable extends Component {

	render () {

		return (
			<table className={ styles.base }>
				<thead>
					<tr>
						<td>Creator</td>
						<td>Name</td>
						<td>Status</td>
						<td>Players</td>
					</tr>
				</thead>
				<tbody>
					{ this.getRows() }
				</tbody>
			</table>
		);

	}

	getRows () {
		const items = [];

		for (let key in this.props.games) {
			if (this.props.games.hasOwnProperty(key)) {
				items.push(<GameTableRow key={ key } game={ this.props.games[key] } />);
			}
		}

		return items;
	}

}
