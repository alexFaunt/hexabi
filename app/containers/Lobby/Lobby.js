import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getCurrentMember } from '../../actions/Member';

import GameTable from '../../components/GameTable/GameTable';

@connect(
    state => ({
		member: state.Member
	})
)
export default class Lobby extends Component {

	static required = [
		getCurrentMember
	]

	getFocusGames () {
		const players = this.props.member.players;

		const games = [];

		players.forEach(function (player) {
			if (player.focus) {
				games.push(player.game);
			}
	 	});

		return games;
	}

	render () {
		return (
			<div>
				<h3>Your Turn!</h3>
				<GameTable games={ this.getFocusGames() } />
			</div>
		);
	}
}
