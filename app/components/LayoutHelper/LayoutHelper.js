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
        const { vgap, hgap, type, children, className } = this.props;

        const inlineStyles = {
            margin: `${ vgap } ${ hgap }`
        }

        const content = children.map(function (child, i) {
            return (
                <div key={ i } className={ styles.inner } style={ inlineStyles }>
                    { child }
                </div>
            );
        });

        return (
            <div className={ `${ className } ${ styles[type] }`} >
                { content }
            </div>
        );
    }
};
