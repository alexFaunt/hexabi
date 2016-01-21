import styles from './Header.css';
import { lexums } from '../../content';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import { openMenu } from '../../actions/OverlayActions';

@connect(
	state => ({ session: state.Session })
)
export default class Header extends Component {

	openMenu = () => {
		this.props.dispatch(openMenu());
	}

	render () {
		const elements = [ <h1 key="title" className={ styles.title }>{ lexums.title }</h1> ];

		if (this.props.session.isLoggedIn) {
			elements.unshift(<div className={ styles.left } key="menu" onClick={ this.openMenu }>MENU BUTTON</div>);
			elements.push(<div className={ styles.right } key="avatar">Avatar</div>);
		}
		else {
			elements.unshift(<div className={ styles.left } key="logo">LOGO</div>);
			elements.push(
				<Link key="login" to="login" className={ `${ styles.button } ${ styles.right }` }>
					{ lexums.login }
				</Link>
			);
		}

		return (
			<header className={ styles.base }>{ elements }</header>
		);
	}
};
