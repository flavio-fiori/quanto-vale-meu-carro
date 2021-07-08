import React, { Fragment } from 'react';

import { useCar } from '../context/Car';

import { Header } from './../components/Header';
import { GridContainer } from './../components/GridContainer';
import { Form } from '../components/Form';
import { Results } from '../components/Results';

export default function Home() {

    const { wasSearched } = useCar();

    return (

        <Fragment>

            <Header />

            <GridContainer>
                {
                    !wasSearched ? (

                        <Form />

                    ) : (


                        <Results />

                    )
                }

            </GridContainer>

        </Fragment>
    )
}
