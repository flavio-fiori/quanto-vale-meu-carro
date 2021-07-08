import { ReactNode, createContext, useContext, useState } from "react";

interface Car {
    precoMedio: string;
    brand: string;
    model: string;
    modelYear: string;
    version: string;
}

interface CarContextData {
    car: Car;
    wasSearched: boolean;
    changeSearch: () => void;
    saveCar: (car: Car) => void;
}

interface CarProviderProps {
    children: ReactNode;
};

const CarContext = createContext({} as CarContextData);

export function CarProvider({ children }: CarProviderProps) {

    const [wasSearched, setWasSearched] = useState<boolean>(false);
    const [car, setCar] = useState<Car>({
        precoMedio: '',
        brand: '',
        model: '',
        modelYear: '',
        version: ''
    });

    function changeSearch() {
        setWasSearched(!wasSearched);
    };

    function saveCar(car: Car) {
        setCar(car);
    };

    return (

        <CarContext.Provider value={{
            wasSearched,
            changeSearch,
            car,
            saveCar
        }}>
            { children }
        </CarContext.Provider>

    )

};

export function useCar() {

    return useContext<CarContextData>(CarContext);

}; 
