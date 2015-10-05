import styles from './App.css';

import React, { Component } from 'react';

import HexGrid from './HexGrid/HexGrid';

export default class App extends Component {

  render() {
    return (
      <div className={styles.base}>
        <HexGrid cols='5' rows='9'/>
      </div>
    );
  }

};
