import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getAllActions, getAllUsers, getUser } from "../../actions";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const users = useSelector((state) => state.usersLoaded);

  console.log(users, "USEEEERRRSS");

  const dispatch = useDispatch();

  const { push } = useHistory();

  useEffect(() => {
    // Llamamos la accion getAllUsers para trar la informacion de todos los usuarios  
    dispatch(getAllUsers());
    dispatch(getAllActions());
  }, [dispatch]);

  const handleChangeUser = (event) => setUser(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleSubmit = () => {
    //buscamos si el usuario ingresado existe  
    const userLogin = users.filter(
      (u) => u.userName === user && u.password === password
    );
    if (userLogin.length === 0) {
      alert("USUARIO INVALIDO");
    }else{
        dispatch(getUser(userLogin[0]))
        push("/home")
    }
  };

  console.log(user, "USER");
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
        <Text>LOGIN</Text>
        <FormControl
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormLabel>User Name</FormLabel>
          <Input
            placeholder="Ingresa tu usuario"
            value={user}
            w="80%"
            bgColor="white"
            name="user"
            onChange={handleChangeUser}
          />
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Ingresa tu contraseña"
            value={password}
            w="80%"
            bgColor="white"
            type="password"
            name="password"
            onChange={handleChangePassword}
          />
          <Flex>
            <Button
              rightIcon={<ArrowForwardIcon />}
              type="submit"
              colorScheme="telegram"
              variant="outline"
              marginTop="1em"
              onClick={handleSubmit}
              margin="1em"
            >
              Ingresar
            </Button>
            <Link to="/register">
              <Button
                /* rightIcon={<ArrowForwardIcon />} */
                type="submit"
                colorScheme="telegram"
                variant="outline"
                marginTop="1em"
                /* onClick={handleSubmit} */
              >
                Registrarse
              </Button>
            </Link>
          </Flex>
        </FormControl>
      </Flex>
    </Box>
  );
}
