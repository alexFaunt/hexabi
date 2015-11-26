import styles from './LayoutHelper.css';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LayoutHelper extends Component {

    // Todo required type + children

    static defaultProps = {
        vgap: 0,
        hgap: 0
    }

    render () {
        const inlineStyles = {
            margin: `${ this.props.vgap } ${ this.props.hgap }`
        }

        const content = this.props.children.map(function (child, i) {
            return (
                <div key={ i } className={ styles.inner } style={ inlineStyles }>
                    { child }
                </div>
            );
        });

        return (
            <div className={ styles[this.props.type] }>
                { content }
            </div>
        );
    }
};
