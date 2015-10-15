import styles from './HexLink.css';

import React, { Component } from 'react';
import { Link } from 'react-router';

import Hex from '../Hex/Hex';

export default class HexLink extends Hex {
    render () {
        return (
            <Hex width="120px" className={styles.base}>
                <Link to={this.props.to} className={styles.link}>
                    {this.props.children}
                </Link>
            </Hex>

        );
    }
};
