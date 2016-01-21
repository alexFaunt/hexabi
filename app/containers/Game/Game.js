import styles from './Game.css';

import React, { Component } from 'react';

import Header from '../../components/Header/Header';

export default class Page extends Component {
    render () {
        return (
            <div className={ styles.base }>
                <Header />
                <main className={ styles.main }>
                    { this.props.children }
                </main>
            </div>
        );
    }
};
