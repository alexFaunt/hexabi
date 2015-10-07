import styles from './HexGrid.css';

import React, { Component } from 'react';

import HexRow from '../HexRow/HexRow';

export default class HexGrid extends Component {

    render() {
        // Required property - we need to be passed this
        const colCount = parseInt(this.props.cols, 10);

        const hexesPerRow = !!(colCount % 2) ? (colCount + 1) / 2 : colCount / 2;

        // One of these has to be populated
        // const hexCount = parseInt(this.props.hexes, 10);
        const rowCount = parseInt(this.props.rows, 10);

        // mark up array to be wrapped
        const markup = [];

        for (let i = 0; i < rowCount; i += 1) {
            // Lots of hexes in a row
            const hexRow = <HexRow />;

            hexRow.props.even = !!(i % 2);

            hexRow.props.maxHexes = hexesPerRow;

            markup.push(hexRow);
        }

        var paddBottom = 100/7;

        // content wrapped in a class
        return <div className={styles.base} style={{
            paddingBottom: 85 / rowCount + '%' // (100% / rows) * 0.85 < the hex ratio
        }}>{markup}</div>;
    }

};
