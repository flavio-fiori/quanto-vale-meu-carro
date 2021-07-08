import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface OptionsObject {
    id: string;
    name: string;
}

interface FieldProps {
    id: string;
    label: string;
    placeholder: string;
    isDisabled: boolean;
    options: Array<string>|Array<OptionsObject>;
    onChange?: (string: string) => void;
}

export function Field({ id, label, placeholder, isDisabled, options, onChange }: FieldProps) {

    const newOptions = options.map(option => {

        if(typeof option === 'string') {

            return (<option key={option} value={option}>{option}</option>)

        } else if(typeof option === 'object') {

            return (<option key={option.id} value={option.id}>{option.name}</option>)

        }

    });

    return(

        <FormControl id={ id } isDisabled={ isDisabled }>
            <FormLabel>{ label }:</FormLabel>
            <Select 
                placeholder={ placeholder }
                onChange={onChange ? (event) => onChange(event.target.value) : () => false }    
            >                

                { newOptions }

            </Select>
        </FormControl>

    )

}