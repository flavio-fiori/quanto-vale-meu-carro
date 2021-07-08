import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FaAngleDoubleLeft } from 'react-icons/fa';

import { useCar } from '../../context/Car';

export function Intro() {

    const { changeSearch, saveCar } = useCar();

    const backHome = () => {

        changeSearch();

        saveCar({
            precoMedio: '',
            brand: '',
            model: '',
            modelYear: '',
            version: ''
        });

    };

    return (

        <Flex
                alignItems="center"
                justifyContent="space-between"
            >

            <IconButton
                onClick={backHome}
                aria-label="Buscar outro carro"
                backgroundColor="secondary"
                color="white" 
                _hover={{
                    backgroundColor: "secondary"
                }}
                borderRadius="4"
                icon={<FaAngleDoubleLeft />} />

            <Text
                textAlign="right"
                paddingLeft="2"
            >
                Encontramos o valor do seu carro. 
                Confirar abaixo :) 
            </Text>

        </Flex>

    )

}