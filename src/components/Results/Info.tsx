import { Flex, Heading, Box, Table, Tbody, Th, Tr, Td } from "@chakra-ui/react";

import { useCar } from "./../../context/Car";

export function Info() {

    const { car } = useCar();


    return(

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
                Valor em média do seu carro: 
                <Box
                    fontWeight="bold"
                    color="secondary"
                >
                    {car.precoMedio}
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
                        <Td>{car.brand}</Td>
                    </Tr>
                    <Tr>
                        <Th>Modelo:</Th>
                        <Td>{car.model}</Td>
                    </Tr>
                    <Tr>
                        <Th>Ano:</Th>
                        <Td>{car.modelYear}</Td>
                    </Tr>
                    <Tr>
                        <Th>Versão:</Th>
                        <Td>{car.version}</Td>
                    </Tr>
                </Tbody>
            </Table>

        </Flex>

    )

}