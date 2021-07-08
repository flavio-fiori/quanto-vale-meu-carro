import { useEffect, useState, FormEvent } from 'react';
import { Flex, Text, Box, VStack, FormControl, FormLabel, Select, Button, Image } from '@chakra-ui/react';
import { FaCalculator } from 'react-icons/fa';

import { useCar } from '../context/Car';

import { api } from '../services/api';
import { formatToReal } from '../utils/formatData';

interface Version {
    versionId: string;
    version: string;
}

export function Form() {

    const { changeSearch, saveCar } = useCar();

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const [brands, setBrands] = useState<string[]>([]);
    const [currentBrand, setcurrentBrand] = useState<string>('');

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
                .then(response => setVersions(response.data));
            
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
                <FormControl id="brands">
                    <FormLabel>Marcas:</FormLabel>
                    <Select 
                        placeholder="Selecione a marca"
                        onChange={(event) => setcurrentBrand(event.target.value)}    
                    >
                        {
                            brands &&
                            brands.map(brand => (
                                <option key={ brand } value={ brand }>{ brand }</option>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl 
                    id="models" 
                    isDisabled={currentBrand === ''}                    
                >
                    <FormLabel>Modelos:</FormLabel>
                    <Select 
                        placeholder="Selecione o modelo"
                        onChange={(event) => setCurrentModel(event.target.value)}
                    >
                        {
                            models &&
                            models.map(model => (
                                <option key={ model } value={ model }>{ model }</option>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl 
                    id="years" 
                    isDisabled={currentModel === ''}                    
                >
                    <FormLabel>Anos:</FormLabel>
                    <Select 
                        placeholder="Selecione o ano"
                        onChange={(event) => setCurrentYear(event.target.value)}
                    >
                        {
                            years &&
                            years.map(year => (
                                <option key={ year } value={ year }>{ year }</option>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl 
                    id="versions" 
                    isDisabled={currentYear === ''}
                >
                    <FormLabel>Versões:</FormLabel>
                    <Select 
                        placeholder="Selecione a versão"
                        onChange={(event) => setCurrentVersion(event.target.value)}
                    >
                        {
                            versions &&
                            versions.map(element => (
                                <option key={ element.versionId } value={ element.versionId }>{ element.version }</option>
                            ))
                        }
                    </Select>
                </FormControl>

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