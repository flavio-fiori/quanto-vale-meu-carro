import { Text, Box, Image } from "@chakra-ui/react";

export function Intro() {

    return (

        <Box
            width={["100%","100%","100%", "48%"]}
        >
            <Text
                fontSize={["16px", "16px", "16px", "24px"]}
            >
                Não sabe o valor do <Box as="strong">seu carro?</Box> Venha com a gente e descubrimos juntos! #quantoVale
            </Text>

            <Image 
                maxWidth="380px"
                marginX="auto"
                marginTop="8"
                display={["none", "none", "none", "block"]}
                src="images/carro-2.png" 
                alt="Ilustração de um carro"/>
        </Box>

    )

}