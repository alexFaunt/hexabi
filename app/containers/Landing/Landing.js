import styles from './Landing.css';
import { lexums } from '../../content';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Hero from '../../components/Hero/Hero';
import TreatmentPromo from '../../components/TreatmentPromo/TreatmentPromo';
import ProviderList from '../../components/ProviderList/ProviderList';

import * as ProviderActions from '../../actions/Provider';

@connect(state => ({ providers: state.Provider }))
export default class Landing extends Component {
    static required = [ ProviderActions.getProviders ]

    render () {
         const { providers, dispatch } = this.props;

        // TODO don't hard code this lol?
        const treatments = [ 'hair', 'skin', 'glam' ];

        return (
            <div>
                <Hero>
                    <h2>{ lexums.tagLine }</h2>
                </Hero>

                <TreatmentPromo treatments={ treatments }/>

                <ProviderList providers={ providers } { ...bindActionCreators(ProviderActions, dispatch) }/>
            </div>
        );
    }
};
