import { Flex, Text, Box, VStack, FormControl, FormLabel, Select, Button, Image } from '@chakra-ui/react';
import { FaCalculator } from 'react-icons/fa';

export function Form() {

    return (

        <Flex
            as="form"
            flexDirection={["column", "column", "column", "row"]}
            justifyContent={["initial","initial","initial","space-between"]}             
        >
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

            <VStack
                width={["100%","100%","100%", "40%"]}
                marginTop={["4", "4", "4", "0"]} 
                spacing="4"
            >
                <FormControl>
                    <FormLabel>Marcas:</FormLabel>
                    <Select placeholder="Selecione a marca"></Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Modelos:</FormLabel>
                    <Select placeholder="Selecione o modelo"></Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Anos:</FormLabel>
                    <Select placeholder="Selecione o ano"></Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Versões:</FormLabel>
                    <Select placeholder="Selecione a versão"></Select>
                </FormControl>

                <Button
                    width="100%"
                    isLoading={false}
                    loadingText="Calculando"
                    backgroundColor="secondary"
                    _hover={{
                        backgroundColor: "primary"
                    }}
                    leftIcon={<FaCalculator/>}
                    color="white"
                >
                    Calcular
                </Button>
            </VStack>

        </Flex>

    )

}