import styles from './HexRow.css';

import React, { Component } from 'react';

import Hex from '../Hex/Hex';

// import hexMath from '../shared/hexMath/hexMath'; // TODO - why doesnt this work.

export default class HexRow extends Component {

    render() {

        // Props tell us how many hexes are in this row.
        let maxHexes = parseInt(this.props.maxHexes, 10);

        // 4x + 3x/2
        // 11x/2 = 100%
        // x = (100 * 2) / 11
        // x = 200 / ((i*2 + (i-1))
        const hexWidth = 200 / ((maxHexes * 2) + (maxHexes - 1));

        // mark up array to be wrapped
        const markup = [];

        const hexCount = this.props.even ? maxHexes - 1 : maxHexes;

        for (let i = 0; i < hexCount; i += 1) {
            // Lots of hexes in a row
            const hex = <Hex />;

            // We decide it's width
            hex.props.width = hexWidth + '%';

            // Only if its not the first child, then it gets a left margin gap
            if (i) {
                // We move it accross a bit to allow for tesselation of next row.
                hex.props.marginLeft = hexWidth/2 + '%';
            }

            markup.push(hex);
        }

        let className = styles.base;

        const style = {};

        if (this.props.even) {
            className += ' ' + styles.even;
            style.transform = 'translate3d(' + (hexWidth * 0.75) + '%, -50%, 0)';
        }

        // content wrapped in a class
        return <div className={className} style={style}>{markup}</div>;
    }

};
