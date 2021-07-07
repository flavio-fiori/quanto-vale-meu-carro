import { Fragment } from 'react';
import { Flex, Heading, Text, Divider, IconButton, Box, Table, Tbody, Th, Tr, Td} from '@chakra-ui/react';
import { FaAngleDoubleLeft } from 'react-icons/fa'

export function Results() {

    return (

        <Fragment>

            <Flex
                alignItems="center"
                justifyContent="space-between"
            >

                <IconButton
                    aria-label="Buscar outro carro" 
                    icon={<FaAngleDoubleLeft />} />

                <Text
                    textAlign="right"
                    paddingLeft="2"
                >
                    Encontramos o valor do seu carro. 
                    Confirar abaixo :) 
                </Text>

            </Flex>

            <Divider 
                marginY="8"
            />

            <Flex
                flexDirection={["column", "column", "column", "row"]}
                justifyContent={["initial","initial","initial","space-between"]}
                alignItems={["initial","initial","initial","center"]}    
            >

                <Heading
                    width={["100%","100%","100%", "48%"]}
                    textAlign="center"
                    fontWeight="300"
                >
                    Valor do seu carro: 
                    <Box
                        fontWeight="bold"
                        color="secondary"
                    >
                        R$99.000,00
                    </Box>
                </Heading>

                <Table
                    width={["100%","100%","100%", "48%"]}
                    marginTop="4" 
                    variant="simple"
                >
                    <Tbody>
                        <Tr>
                            <Th>Marca:</Th>
                            <Td>Lorem</Td>
                        </Tr>
                        <Tr>
                            <Th>Modelo:</Th>
                            <Td>Lorem</Td>
                        </Tr>
                        <Tr>
                            <Th>Ano:</Th>
                            <Td>Lorem</Td>
                        </Tr>
                        <Tr>
                            <Th>Versão:</Th>
                            <Td>Lorem</Td>
                        </Tr>
                    </Tbody>
                </Table>

            </Flex>

        </Fragment>

    )

}