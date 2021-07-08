import { useEffect, useState, FormEvent } from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { FaCalculator } from 'react-icons/fa';

import { useCar } from '../../context/Car';

import { Field } from './Field';

import { api } from '../../services/api';
import { formatToReal } from '../../utils/formatData';
import { showMessageError } from '../../utils/showMessageError';

interface VersionResponse {
    versionId: string;
    version: string;
};

interface Version {
    id: string;
    name: string;
};

export function Fieldset() {

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
            .then(response => setBrands(response.data))
            .catch(error => showMessageError(error.message));

    }, []);

    useEffect(() => {

        if(currentBrand) {

            api.get(`/brands/${currentBrand}/models`)
                .then(response => setModels(response.data))
                .catch(error => showMessageError(error.message));

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

                })
                .catch(error => showMessageError(error.message));

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

                })
                .catch(error => showMessageError(error.message));
            
            setCurrentVersion('');
        }

    }, [currentBrand, currentModel, currentYear]);

    const handleSearchCar = async (event: FormEvent) => {

        event.preventDefault();

        setIsSubmitted(true);
        
        try {
            
            const response = await api.get(`/brands/${currentBrand}/models/${currentModel}/years/${currentYear}/versions/${currentVersion}`);
            
            const { precoMedio, brand, model, modelYear, version } = response.data; 
            
            changeSearch();
            setIsSubmitted(false);
            
            saveCar({
                precoMedio: formatToReal(precoMedio), 
                brand, 
                model, 
                modelYear, 
                version
            });   

        } catch (error) {
            
            setIsSubmitted(false);
            showMessageError(error.message);

        }     
        
    };

    return (

        <VStack
            as="form"
            onSubmit={handleSearchCar}  
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
                label="Ano(s)"
                placeholder="Selecione o ano"
                isDisabled={currentModel === ''}
                options={years}
                onChange={setCurrentYear}
            />

            <Field
                id="versions"
                label="Versão"
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

    )

}