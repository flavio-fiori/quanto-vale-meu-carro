import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { CarProvider } from "./../context/Car";

import { theme } from "./../styles/theme";


function MyApp({ Component, pageProps }: AppProps) {
    
    return (

        <ChakraProvider theme={theme}>

            <CarProvider>

                <Component {...pageProps} />

            </CarProvider>
            
        </ChakraProvider>

    );

}
export default MyApp
