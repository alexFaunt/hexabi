import styles from './ProviderTile.css';

import React, { Component } from 'react';

import { Link } from 'react-router';

export default class ProviderTile extends Component {

    render () {
        const { provider } = this.props;

        return (
            <Link to={ `/provider/${ provider.id }` } className={ styles.base } >
                <div className={ styles.content }>
                    <p>{ provider.member.name }</p>
                    <p>Styles: { provider.type }</p>
                </div>
            </Link>
        );
    }
};
