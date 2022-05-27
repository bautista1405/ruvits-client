import React from 'react'

import {
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    InputLeftAddon,
    Textarea,
    FormHelperText,
    Text,
    Checkbox,
    Icon,
    VisuallyHidden,
    Select,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'

import {FaUser} from 'react-icons/fa'


const newProduct = () => {
  return (
    <div>
        <Box bg="transparent" p={10}>
            <Box>
                <SimpleGrid
                display={{ base: "initial", md: "grid" }}
                columns={{ md: 3 }}
                spacing={{ md: 6 }}
                >
                <GridItem colSpan={{ md: 1 }}>
                    <Box px={[4, 0]}>
                    <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                        Información de tu producto
                    </Heading>
                    <Text
                        mt={1}
                        fontSize="sm"
                        color="gray"
                    >
                        Acá van los datos de tu producto: título, descripción, precio, archivos
                    </Text>
                    </Box>
                </GridItem>
                <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                    <chakra.form
                    method="POST"
                    shadow="base"
                    rounded={[null, "md"]}
                    overflow={{ sm: "hidden" }}
                    >
                    <Stack
                        px={4}
                        py={5}
                        bg="transparent"
                        spacing={6}
                        p={{ sm: 6 }}
                    >
                        <SimpleGrid columns={3} spacing={6}>
                        <FormControl as={GridItem} colSpan={[3, 2]}>
                            <FormLabel
                            fontSize="sm"
                            fontWeight="md"
                            color="gray"
                            >
                            Título
                            </FormLabel>
                            <InputGroup size="sm">
                            <Input
                                type="tel"
                                placeholder="Título de tu producto..."
                                focusBorderColor="brand.400"
                                rounded="md"
                            />
                            </InputGroup>
                        </FormControl>
                        </SimpleGrid>

                        <div>
                        <FormControl id="email" mt={1}>
                            <FormLabel
                            fontSize="sm"
                            fontWeight="md"
                            color="gray"
                            >
                            Descripción
                            </FormLabel>
                            <Textarea
                            placeholder="Describí tu producto..."
                            mt={1}
                            rows={3}
                            shadow="sm"
                            focusBorderColor="brand.400"
                            fontSize={{ sm: "sm" }}
                            />
                            <FormHelperText>
                            Puede ser de qué se trata, a qué apunta, qué formato de archivo es.
                            </FormHelperText>
                        </FormControl>
                        </div>

                        <FormControl>
                        <FormLabel
                            fontSize="sm"
                            fontWeight="md"
                            color="gray"
                        >
                            Foto de portada
                        </FormLabel>
                        <Flex alignItems="center" mt={1}>
                            <Avatar
                            boxSize={12}
                            bg="gray"
                            icon={
                                <Icon
                                as={FaUser}
                                boxSize={9}
                                mt={3}
                                rounded="full"
                                color="gray"
                                />
                            }
                            />
                            <Button
                            type="button"
                            ml={5}
                            variant="outline"
                            size="sm"
                            fontWeight="medium"
                            _focus={{ shadow: "none" }}
                            >
                           + Cargar 
                            </Button>
                        </Flex>
                        </FormControl>

                        <FormControl>
                        <FormLabel
                            fontSize="sm"
                            fontWeight="md"
                            color="gray"
                        >
                            Subí tu contenido
                        </FormLabel>
                        <Flex
                            mt={1}
                            justify="center"
                            px={6}
                            pt={5}
                            pb={6}
                            borderWidth={2}
                            borderColor="gray"
                            borderStyle="dashed"
                            rounded="md"
                        >
                            <Stack spacing={1} textAlign="center">
                            <Icon
                                mx="auto"
                                boxSize={12}
                                color="gray"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </Icon>
                            <Flex
                                fontSize="sm"
                                color="gray"
                                alignItems="baseline"
                            >
                                <chakra.label
                                htmlFor="file-upload"
                                cursor="pointer"
                                rounded="md"
                                fontSize="md"
                                color="gray"
                                pos="relative"
                                _hover={{
                                    color: "gray.100",
                                }}
                                >
                                <span>Cargá un archivo</span>
                                <VisuallyHidden>
                                    <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    />
                                </VisuallyHidden>
                                </chakra.label>
                                
                            </Flex>
                            <Text
                                fontSize="xs"
                                color="gray"
                            >
                                PNG, JPG, PDF 
                            </Text>
                            </Stack>
                        </Flex>
                        </FormControl>
                    </Stack>
                    <Box
                        px={{ base: 4, sm: 6 }}
                        py={3}
                        bg="black"
                        textAlign="center"
                    >
                        <Button
                        type="submit"
                        colorScheme="white"
                        color="white"
                        _focus={{ shadow: "" }}
                        fontWeight="md"
                        >
                        Crear producto
                        </Button>
                    </Box>
                    </chakra.form>
                </GridItem>
                </SimpleGrid>
            </Box>
            <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
                <Box py={5}>
                <Box
                    borderTop="solid 1px"
                    borderTopColor="gray"
                ></Box>
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default newProduct