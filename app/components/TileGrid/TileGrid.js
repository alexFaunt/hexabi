import styles from './TileGrid.css';

import React, { Component } from 'react';

// WHY DID I DO THIS INSTEAD OF A PROPER GRID?
export default class TileGrid extends Component {

    render () {

        const { columns, children } = this.props;

        const normalStyle = {
            width: `calc(${ (100/columns) }% - ${ 10 * (columns - 1) }px)`
        };

        const highlightStyle = {
            width: `calc(${ (100/columns) }% - ${ 10 * (columns - 1) }px)`
        };

        const rows = children.map(function (item, i) {
            return (
                <div key={ i } className={ styles.tile } style={ normalStyle } >
                    { item }
                </div>
            );
        });

        return (
            <div className={ styles.grid } >{ rows }</div>
        );
    }

};
