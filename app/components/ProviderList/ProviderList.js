import styles from './ProviderList.css';

import React, { Component } from 'react';

import ProviderTile from '../ProviderTile/ProviderTile';

import TileGrid from '../TileGrid/TileGrid';

export default class ProviderList extends Component {

    render () {
        const { providers } = this.props;
        const cols = 3;

        // const tiles = Object.keys(providers).map(function (id) {
        const tiles = [];
        Object.keys(providers).forEach(function (id) {
            tiles.push(
                <ProviderTile
                    key = { id }
                    provider = { providers[id] }
                />
            );
        });

        return <TileGrid columns={ cols } >{ tiles }</TileGrid>;
    }
};
