import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Flex, Text, Grid, GridItem, Box, VStack } from "@chakra-ui/layout";

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <VStack>
      <Flex bgColor="telegram.100" w="100%" justifyContent="space-between">
        <Flex margin="1em">
          <Text fontSize="3xl">Mis Acciones</Text>
        </Flex>
        <Flex margin="1em">
          <Text fontSize="3xl"> Usuario: {user.name}</Text>
        </Flex>
      </Flex>
      
    </VStack>
  );
}
