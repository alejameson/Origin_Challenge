import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Flex, Text, Grid, GridItem, Box, VStack, HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { actionsLoaded, getAllActions, getUser, removeActions } from "../../actions";
import Autocomplete from "../Autocomplete/Autocomplete";

export default function Home() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user);
  const userActions = useSelector((state) => state.userActions);

  const dispatch = useDispatch();

  const actions = useSelector((state) => state.actionsLoaded);
  const symbols = [];

  actions.map(a => symbols.push(a.symbol));

  console.log(options, "SYMBOLS")
  useEffect(() => {
    if(symbols.length){
      setOptions(symbols);
    }
  }, [user])

  useEffect(() => {
    /* setUseraction(user.actions); */
    dispatch(actionsLoaded(user.actions));
  },[]);

  function onClick(action){
    console.log(action, "AC NAME")
    dispatch(removeActions(action));
  } 

  
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
      <Flex flexDir="column">
        {options.length?
        <Autocomplete lang={options}/>
        :(<h1>CARGANDO...</h1>)
        }
      </Flex>
      <Flex>
        {user.actions.length > 0 ?
        <Box>
        <HStack spacing="20vh">
        <VStack bg="telegram.100" w="20vh">
            <Box>SYMBOL</Box>
        </VStack>
        <VStack bg="telegram.100" w="30vh">
           <Box>NOMBRE</Box>
        </VStack>
        <VStack bg="telegram.100" w="20vh">
            <Box>CURRENCY</Box>
        </VStack>
        <VStack bg="telegram.100" w="20vh">
            <Box>ELIMINAR</Box>
        </VStack>
      </HStack>
        <HStack spacing="20vh">
          <VStack bg="blackAlpha.100" w="20vh">
            	{userActions.map(a => <Link to={`/action/${a.symbol}`}><Box color="telegram.400">{a.symbol}</Box></Link>)}
          </VStack>
          <VStack bg="blackAlpha.100" w="30vh">
            	{userActions.map(a => <Box >{a.name}</Box>)}
          </VStack>
          <VStack bg="blackAlpha.100"w="20vh">
            	{userActions.map(a => <Box >{a.currency}</Box>)}
          </VStack>
          <VStack bg="blackAlpha.100" w="20vh">
            	{userActions.map(a => <Button bg="telegram.100" h="1.53em" name={a.symbol} onClick={(e) => onClick(e.target.name)}>❌</Button>)}
          </VStack>
        </HStack>
        </Box> 
        : <h3>AGREGUE SIMBOLOS</h3>}
      </Flex>
      
    </VStack>
  );
}
