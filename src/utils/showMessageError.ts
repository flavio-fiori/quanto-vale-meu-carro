import { createStandaloneToast } from "@chakra-ui/react"

export function showMessageError(message: string) {

    const toast = createStandaloneToast();

    toast({
        title: 'Erro:',
        description: message,
        status: "error",
        isClosable: true,
    })

}