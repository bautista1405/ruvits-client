// Chakra imports
import { Avatar, Box, Flex, Icon, Text, useColorModeValue, Image, Stack } from "@chakra-ui/react";
import Card from "./card/Card.js";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name, job, productos, ventas, calificación, star} = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={10} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='100%'
        w='60%'
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundPosition='center'
      />
      <Avatar
        mx='auto'
        src={avatar}
        h='120px'
        w='120px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {job}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex me='60px' mx={6} align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {productos}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            productos
          </Text>
        </Flex>
        <Flex me='60px' mx={2} align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {ventas}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            ventas
          </Text>
        </Flex>
        <Flex mx={3} alignItems='center' direction='column'>
          <Stack direction='horizontal' ml={4}>
            <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
              {calificación}
            <Icon as={star} mx={2} pt={2} />
            </Text>
          </Stack>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            calificación
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
