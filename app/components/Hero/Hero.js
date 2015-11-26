import styles from './Hero.css';
import { assets } from '../../content';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Hero extends Component {

    render () {
        return (
            <div className={ styles.base } style={{ backgroundImage: 'url("' + assets.heroImage + '")'}}>
                <div className={ styles.content }>
                    { this.props.children }
                </div>
            </div>
        );
    }
};
