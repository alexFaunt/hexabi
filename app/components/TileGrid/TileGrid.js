import styles from './TileGrid.css';

import React, { Component } from 'react';

export default class TileGrid extends Component {

    render () {

        const rows = this.props.children.map(function (item, i) {
            return (
                <div key={ i } className={ styles.tile } >
                    { item }
                </div>
            );
        });

        return (
            <div className={ styles.grid } >{ rows }</div>
        );
    }

};
