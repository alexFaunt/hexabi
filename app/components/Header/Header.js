import styles from './Header.css';
import { lexums } from '../../content';

import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
    state => ({ session: state.Session })
)
export default class Header extends Component {

    render () {
        const elements = [ <h1 key="title" className={ styles.title }>{ lexums.title }</h1> ];

        if (this.props.session.isLoggedIn) {
            elements.unshift(<div key="menu">MENU BUTTON</div>);
            elements.push(<div key="avatar">Avatar</div>);
        }
        else {
            elements.unshift(<div key="logo">LOGO</div>);
            elements.push(<div key="login">{ lexums.login }</div>);
        }

        return (
            <header className={ styles.base }>{ elements }</header>
        );
    }
};
