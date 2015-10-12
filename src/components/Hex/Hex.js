import styles from './Hex.css';

import React, { Component } from 'react';

export default class Hex extends Component {

    render () {
        return (
            <div className={styles.base} style={{
                width: this.props.width,
                marginLeft: this.props.marginLeft,
                backgroundColor: this.props.background
            }}>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>);
    }
};
