import styles from './Footer.css';
import content from '../../content';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {

    render () {
        return (
            <footer className={ styles.base }>
                <Link to="/terms">Terms and Conditions</Link>
                <Link to="/contact">Contact us</Link>
            </footer>
        );
    }
};
