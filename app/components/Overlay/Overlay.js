import styles from './Overlay.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import Menu from '../Menu/Menu';

@connect(
	state => ({ overlay: state.Overlay }),
	{ pushState }
)
export default class Overlay extends Component {

	render () {
		const overlay = this.props.overlay;

		const overlays = [];
		if (overlay.menu) {
			overlays.push(<Menu />)
		}

		return (
			<div>
				{ overlays }
			</div>
		);
	}
}
