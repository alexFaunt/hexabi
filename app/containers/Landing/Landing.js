import { lexums } from '../../content';

import React, { Component } from 'react';

import Hero from '../../components/Hero/Hero';
import Content from '../../components/Content/Content';

export default class Landing extends Component {

	render () {
		return (
			<div>
				<Hero>
					<h2>{ lexums.tagLine }</h2>
				</Hero>

				<Content>
					<p>Some content could go here!</p>
				</Content>
			</div>
		);
	}
}
