
import { Flex } from "@chakra-ui/react";
import { Intro } from "./intro";
import { Fieldset } from "./Fieldset";

export function Form() {    

    return (

        <Flex            
            flexDirection={["column", "column", "column", "row"]}
            justifyContent={["initial","initial","initial","space-between"]}           
        >
            
            <Intro/>

            <Fieldset />

        </Flex>

    )

}