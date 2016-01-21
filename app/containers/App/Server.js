// This means session gets init only once on server side before delivering to client

import React, { Component } from 'react';

import { initSession } from '../../actions/SessionActions';

export default class Server extends Component {

	static required = [
		initSession
	]

	render () {
		return this.props.children;
	}
};
