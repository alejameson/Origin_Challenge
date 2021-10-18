import React, { useState } from "react";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { getAllUsers } from "../../actions";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

export default function Register() {
  const [state, setState] = useState({
    name: "",
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState((state) => ({
        ...state,
        [e.target.name]: e.target.value,
    }))
  };

  console.log(state, "STATE");

  const { push } = useHistory();
  const url = "/";

  const handleSubmit = () => {
    axios.post("http://localhost:3001/createUser", state).then((response) => {
      dispatch(getAllUsers());
      push(url);
    });
    alert("Cuenta creada exitosamente!");

    setState({
      name: "",
      userName: "",
      password: "",
    });
  };
  return (
    <Box display="flex" justifyContent="center">
      <Flex
        justifyContent="space-evenly"
        flexDir="column"
        w="30%"
        h="20rem"
        position="relative"
        top="20vh"
        bgColor="telegram.100"
        alignItems="center"
      >
        <Text>SIGN IN</Text>
        <FormControl
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormLabel>Ingrese su nombre</FormLabel>
          <Input
            placeholder="Ingresa tu usuario"
            value={state.name}
            w="80%"
            bgColor="white"
            name="name"
            onChange={handleChange}
          />
          <FormLabel>Ingrese su UserName</FormLabel>
          <Input
            placeholder="Ingresa tu usuario"
            value={state.userName}
            w="80%"
            bgColor="white"
            name="userName"
            onChange={handleChange}
          />
          <FormLabel>Ingrese su Password</FormLabel>
          <Input
            placeholder="Ingresa tu contraseña"
            value={state.password}
            w="80%"
            bgColor="white"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button
            rightIcon={<ArrowForwardIcon />}
            type="submit"
            colorScheme="telegram"
            variant="outline"
            marginTop="1em"
            onClick={handleSubmit}
          >
            Registrarse
          </Button>
        </FormControl>
      </Flex>
    </Box>
  );
}
