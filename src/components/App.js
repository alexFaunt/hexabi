import styles from './App.css';

import React, { Component } from 'react';

import { Router } from 'react-router';
import HexGrid from './HexGrid/HexGrid';

import HexLink from './HexLink/HexLink';
import Card from './Card/Card';
import Menu from './Menu/Menu';

export default class App extends Component {

    render() {
        return (
            <div className={styles.base}>
                <HexGrid cols='5' rows='8'/>
                <HexLink to="/menu" width="100px">Menu button!</HexLink>
                <Card to="/menu" width="100px" background="red">LOL?</Card>
            </div>
        );
    }

};
