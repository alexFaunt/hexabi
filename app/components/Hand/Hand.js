import styles from './Hand.css';

import React, { Component } from 'react';

import Card from '../Card/Card';

export default class Hand extends Component {

    render () {
        // how many cards do we have
        const cardCount = this.props.cards.length;

        // MaxHexesPerRow - always 2, cause we've not coded it with maths.
        const maxHexesPerRow = 2;

        // row count is always 5, same reason
        const rowCount = 5;

        // mark up array to be wrapped
        const markup = [];

        let i = 0;

        // 4x + 3x/2
        // 11x/2 = 100%
        // x = (100 * 2) / 11
        // x = 200 / ((i*2 + (i-1))
        const hexWidth = 200 / ((maxHexesPerRow * 2) + (maxHexesPerRow - 1));

        let cardIndex = 0;

        while (i++ < rowCount) {
            // If its the 3rd row, and were doing a triangle, add an extra row
            // Same reason again Lol. Ugh. I'm tired.
            const hexes = [
                <Card key='1' width={hexWidth + '%'}
                    colour={this.props.cards[cardIndex].colour}
                    number={this.props.cards[cardIndex].number} />
            ];
            cardIndex += 1;

            const cssStyles = {};
            let className = styles.row;

            if (i === 3 && cardCount > rowCount) {
                hexes.push(<Card key='2' width={hexWidth + '%'}
                    marginLeft={hexWidth/2 + '%'}
                    colour={this.props.cards[cardIndex].colour}
                    number={this.props.cards[cardIndex].number} />);

                cardIndex += 1;
            }

            if (!(i % 2)) {
                className += ' ' + styles.even;
                cssStyles.transform = 'translate3d(' + (hexWidth * 0.75) + '%, -50%, 0)';
            }

            markup.push(<div className={className} key={i} style={cssStyles}>{hexes}</div>);
        }

        // content wrapped in a class
        return <div className={styles.base}>{markup}</div>;

    }

};
