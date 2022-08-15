import {
    Box,
    Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Link,
    Text
} from '@chakra-ui/react'

const FrequentQuestions = () => {
  return (
    <>
        <Flex justifyContent="center" fontSize={32} color="gray.600" fontWeight="bold"> Preguntas frecuentes </Flex>
        <Flex 
            justifyContent="center" 
            h={["70vh", "100vh", "50vh", "50vh", "65vh"]}
            margin={["20px", null, "100px"]}
            overflow="scroll"
            shadow="base"
            rounded={[null, "md"]}
            borderRadius="5px"
            boxShadow='dark-lg' 
        >
            <Accordion 
                allowToggle 
                p={20}
                fontFamily="arial"
                color="gray.600" fontWeight="bold"
            >
                <AccordionItem mb={3}>
                    <h2>
                    <AccordionButton w='70vw'>
                        <Box flex='1' textAlign='left' fontSize={22}>
                            ¿Qué es Ruvits?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} w='70vw'>
                        Ruvits es un marketplace en el cual podes vender tus productos digitales: fotos, videos, PDFs, archivos MP4, PPTs.
                        Pueden ser apuntes, trabajos, material de apoyo, beats, entre otros.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem mb={3}>
                    <h2>
                    <AccordionButton w='70vw'>
                        <Box flex='1' textAlign='left' fontSize={22}>
                            ¿Cómo funciona Ruvits?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} w='70vw'>
                        Ruvits funciona como un punto de encuentro entre vendedores y compradores, utilizando MercadoPago como pasarela de pago.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem mb={3}>
                    <h2>
                    <AccordionButton w='70vw'>
                        <Box flex='1' textAlign='left' fontSize={22}>
                            ¿Cómo puedo empezar a vender en Ruvits?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} w='70vw'>
                        Simple: creás tu cuenta, <Link href='/dashboard/pagos'> <b>vinculas tu cuenta de MercadoPago</b> </Link> y subís tu producto.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem mb={3}>
                    <h2>
                    <AccordionButton w='70vw'>
                        <Box flex='1' textAlign='left' fontSize={22}>
                            ¿Cuáles son los costos por usar la plataforma?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} w='70vw'>
                        Se cobra un 5% por venta. No cobramos por mantención de cuenta ni ninguna mensualidad.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem mb={3}>
                    <h2>
                    <AccordionButton w='70vw' >
                        <Box flex='1' textAlign='left' fontSize={22}>
                            ¿A quiénes está dirigido Ruvits?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} w='70vw'>
                        Ruvits está dirigido a, básicamente, cualquier creador de contenido digital en Argentina que quiera monetizar 
                        sus productos.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    </>
  )
}

export default FrequentQuestions