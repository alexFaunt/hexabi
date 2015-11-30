import styles from './Footer.css';
import { lexums } from '../../content';

import React, { Component } from 'react';
import { Link } from 'react-router';

import Content from '../Content/Content';

export default class Footer extends Component {

    render () {
        return (
            <footer className={ styles.base }>
                <Content>
                    <Link to="/terms" className={ styles.link } >{ lexums.termsTitle }</Link>
                    <Link to="/contact" className={ styles.link } >{ lexums.contactTitle }</Link>
                    <div className={ styles.logo }key="logo">LOGO</div>
                </Content>
            </footer>
        );
    }
};
