import { extendTheme } from '@chakra-ui/react';

import { GridContainer } from './GridContainer';

export const theme = extendTheme({
    colors: {
        primary: "#228855",
        secondary: "#11BB77"
    },
    fonts: {
        heading: "Ubuntu",
        body: "Ubuntu"
    },
    components: {
        GridContainer
    },
    styles: {
        global: {
            body: {
                fontWeight: "300"
            }
        }
    }
})