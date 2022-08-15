import { Flex, Text } from '@chakra-ui/react'

export default function Custom404() {
    return (
        <>
            <Flex alignItems="center" justifyContent="center" h="54vh" margin="30px">

                <Text fontSize={28} color="gray.600" fontWeight="bold">
                    ¡Ooopss! Parece que la página que buscas no existe.
                </Text> 
            
            </Flex>
        </>
    )
}