import { useEffect, useState, FormEvent } from 'react';
import { Flex, Text, Box, VStack, FormControl, FormLabel, Select, Button, Image } from '@chakra-ui/react';
import { FaCalculator } from 'react-icons/fa';

import { useCar } from '../context/Car';

import { Field } from './Field';

import { api } from '../services/api';
import { formatToReal } from '../utils/formatData';

interface VersionResponse {
    versionId: string;
    version: string;
}

interface Version {
    id: string;
    name: string;
}

export function Form() {

    const { changeSearch, saveCar } = useCar();

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const [brands, setBrands] = useState<string[]>([]);
    const [currentBrand, setCurrentBrand] = useState<string>('');

    const [models, setModels] = useState<string[]>([]);
    const [currentModel, setCurrentModel] = useState<string>('');

    const [years, setYears] = useState<string[]>([]);
    const [currentYear, setCurrentYear] = useState<string>('');

    const [versions, setVersions] = useState<Version[]>([]);
    const [currentVersion, setCurrentVersion] = useState<string>('');
    
    useEffect(() => {

        api.get('brands')
            .then(response => setBrands(response.data));

    }, []);

    useEffect(() => {

        if(currentBrand) {

            api.get(`/brands/${currentBrand}/models`)
                .then(response => setModels(response.data))

            setCurrentModel('');
            setCurrentYear('');
            setCurrentVersion('');
        }

    }, [currentBrand]);

    useEffect(() => {

        if(currentModel) {

            api.get(`/brands/${currentBrand}/models/${currentModel}/years`)
                .then(response => {

                    const years = response.data;
                    const treatedYears = years.reduce((accumulator:string[], year: string) => {
                        
                        if(!accumulator.includes(year)) {
                            accumulator.push(year);
                        }

                        return accumulator;

                    }, []).sort((a:number, b:number) => a - b);

                    // console.log(treatedYears);

                    setYears(treatedYears);

                });

            setCurrentYear('');
            setCurrentVersion('');
        }

    }, [currentBrand, currentModel]);

    useEffect(() => {

        if(currentYear) {

            api.get(`/brands/${currentBrand}/models/${currentModel}/years/${currentYear}/versions`)
                .then(response => {
                    let versions = response.data;

                    let newVersions = versions.map((element: VersionResponse) => {
                        return {
                            id: element.versionId,
                            name: element.version
                        }
                    });

                    setVersions(newVersions);

                });
            
            setCurrentVersion('');
        }

    }, [currentBrand, currentModel, currentYear]);

    const handleSearchCar = async (event: FormEvent) => {

        event.preventDefault();

        setIsSubmitted(true);
        
        const response = await api.get(`/brands/${currentBrand}/models/${currentModel}/years/${currentYear}/versions/${currentVersion}`);
        const { precoMedio, brand, model, modelYear, version } = response.data; 

        setIsSubmitted(false);

        changeSearch();

        saveCar({
            precoMedio: formatToReal(precoMedio), 
            brand, 
            model, 
            modelYear, 
            version
        });        

    };

    return (

        <Flex
            as="form"
            flexDirection={["column", "column", "column", "row"]}
            justifyContent={["initial","initial","initial","space-between"]}
            onSubmit={handleSearchCar}             
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

                <Field
                    id="brands"
                    label="Marcas"
                    placeholder="Selecione a marca"
                    isDisabled={false}
                    options={brands}
                    onChange={setCurrentBrand}
                />

                <Field
                    id="models"
                    label="Modelos"
                    placeholder="Selecione o modelo"
                    isDisabled={currentBrand === ''}
                    options={models}
                    onChange={setCurrentModel}
                />

                <Field
                    id="years"
                    label="Modelos"
                    placeholder="Selecione o ano"
                    isDisabled={currentModel === ''}
                    options={years}
                    onChange={setCurrentYear}
                />

                <Field
                    id="versions"
                    label="Modelos"
                    placeholder="Selecione a versão"
                    isDisabled={currentYear === ''}
                    options={versions}
                    onChange={setCurrentVersion}
                />

                <Button
                    type="submit"
                    width="100%"
                    disabled={currentVersion === ''}
                    isLoading={isSubmitted}
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