import styles from './GameList.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GameStub from '../GameStub/GameStub';

import * as GameActions from '../../actions/Game';

@connect(state => ({ games: state.Game }))
export default class GameList extends Component {

    static required = [
        GameActions.getGames
    ]

    render () {
        const { games, dispatch } = this.props;

        const gamesList = games.map(function (game, index) {
            return (
                <GameStub
                    key={index}
                    game={game}

                    {...bindActionCreators(GameActions, dispatch)}
                />);
        });

        return (
            <div>
                {gamesList}
            </div>
        );
    }
};
