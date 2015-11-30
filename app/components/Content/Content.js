import styles from './Content.css';

import React, { Component } from 'react';

export default class Content extends Component {

    render () {
        return (
            <div className={ styles.base } >
                { this.props.children }
            </div>
        );
    }
};
