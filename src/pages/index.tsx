import React, { Fragment } from 'react';
import Head from 'next/head';

import { useCar } from '../context/Car';

import { Header } from './../components/Header';
import { GridContainer } from './../components/GridContainer';
import { Form } from '../components/Form';
import { Results } from '../components/Results';

export default function Home() {

    const { wasSearched } = useCar();

    return (

        <Fragment>

            <Head>
                <title>Quanto vale meu carro?</title>
            </Head>

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
