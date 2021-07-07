import React, { Fragment } from 'react';

import { Header } from './../components/Header';
import { GridContainer } from './../components/GridContainer';
import { Form } from '../components/Form';
import { Results } from '../components/Results';

export default function Home() {

    const test = false;

    return (

        <Fragment>

            <Header />

            <GridContainer>
                {
                    test ? (

                        <Form />

                    ) : (


                        <Results />

                    )
                }

            </GridContainer>

        </Fragment>
    )
}
