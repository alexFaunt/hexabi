import styles from './Card.css';

import React, { Component } from 'react';

import Hex from '../Hex/Hex';

export default class Card extends Component {

    onClick () {
        console.log('LOL');
    }

    render () {
        return (
            <Hex width="100px" background="white">
                <div className={styles.base} onClick={this.onClick.bind(this)}>
                    <div className={styles.inner}
                        style={{backgroundColor: this.props.background}}>
                        <span className={styles.number} style={{color: "white"}}>{this.props.children}</span>
                    </div>
                    </div>
            </Hex>
        );
    }
};
