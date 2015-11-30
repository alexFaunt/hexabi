import styles from './TreatmentPromo.css';
import { treatments } from '../../content';

import React, { Component } from 'react';

import LayoutHelper from '../LayoutHelper/LayoutHelper';
import HexLink from '../HexLink/HexLink';

export default class TreatmentPromo extends Component {

    render () {
        const links = this.props.treatments.map(function (item) {
            return (
                <HexLink
                    key={ item }
                    to="/gallery?query={ item }"
                    background={ `url("${ treatments[item].iconUrl }")` }>
                        { treatments[item].iconName }
                </HexLink>
            )
        });

        return (
            <LayoutHelper className={ styles.base } type="horizontal" hgap="10px">
                { links }
            </LayoutHelper>
        );
    }
};
