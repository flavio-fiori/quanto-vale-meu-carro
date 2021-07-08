import { Flex, Heading, Box } from '@chakra-ui/react';

export function Header() {

    return(

        <Flex
            as="header"
            width="100%"
            backgroundColor="primary"
            paddingTop="4"
            paddingBottom={["12", "12", "12", "24"]}            
        >

            <Heading
                as="h1"
                width="100%"
                fontSize="32px"
                color="white"
                textAlign="center"
            >
                Quanto vale
                <Box
                    as="span"
                    color="secondary"
                    display={["block", "block", "inline"]}
                >
                    meu carro?
                </Box>

            </Heading>

        </Flex>

    )

}