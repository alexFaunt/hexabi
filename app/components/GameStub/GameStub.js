import styles from './GameStub.css';

import React, { Component } from 'react';

export default class GameStub extends Component {

    componentDidMount () {
        // This is now done server side.
        // this.props.getGames();
    }

    handleDelete = (e) => {
        const id = Number(e.target.dataset.id);

        if (isNaN(id)) {
            return;
        }

        this.props.deleteGame(id);
    }

    render () {
        const { game } = this.props;

        return (
            <div>
                <span>id: {game.id}</span>
                <span>creator: {game.creator && game.creator.name}</span>
                <span>players: {game.players && game.players.length}</span>
                <span>status: {game.status}</span>
            </div>
        );
    }
}
