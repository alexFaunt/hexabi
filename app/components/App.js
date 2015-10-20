import styles from './App.css';

import React, { Component } from 'react';

import { Router } from 'react-router';
import HexGrid from './HexGrid/HexGrid';

import HexLink from './HexLink/HexLink';
import Card from './Card/Card';
import Menu from './Menu/Menu';
import Hand from './Hand/Hand';

export default class App extends Component {

    render() {

        return (
            <div className={styles.base}>
                <HexGrid cols='5' rows='8'/>
                <HexLink to="/menu" width="100px">Menu button!</HexLink>
                <Card width="100px" background="red">LOL?</Card>

                <Hand cards={[
                    {colour: "yellow", number: 5},
                    {colour: "pink", number: 5},
                    {colour: "bisque", number: 5},
                    {colour: "blue", number: 5},
                    {colour: "red", number: 5},
                    {colour: "green", number: 5}
                ]} />
            </div>
        );
    }

};
