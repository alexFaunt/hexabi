import styles from './Page.css';

import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Overlay from '../../components/Overlay/Overlay';

export default class Page extends Component {

	render () {
		return (
			<div className={ styles.base }>
				<Header />
				<main className={ styles.main }>
					{ this.props.children }
				</main>
				<Footer />
				<Overlay />
			</div>
		);
	}
}
