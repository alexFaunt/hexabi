import styles from './GameStub.css';

import React, { Component } from 'react';

export default class GameStub extends Component {

    componentDidMount () {
        // This is now done server side.
        // this.props.getGames();
    }

    handleDelete = (e) => {
        const id = Number(e.target.dataset.id);

        if (!id) {
            return;
        }

        this.props.deleteGame(id);
    }

    render () {
        const { game } = this.props;

        return (
            <div>
                { JSON.stringify(game) }
            </div>
        );
    }
}
