import styles from './Page.css';

import React, { Component } from 'react';

import Header from '../Header/Header'

export default class Page extends Component {

    render () {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
};
