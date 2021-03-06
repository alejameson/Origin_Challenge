import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Symbol from "./components/Symbol/Symbol";
import { useSelector } from "react-redux";
import "./App.css";



function App() {
  const user = useSelector((state) => state.user);
  console.log(user, "LOGIN")

  return (
    <ChakraProvider>
      <React.Fragment>
        {/* <NavBar /> */}
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path ="/action/:symbol" 
        render = {({ match }) => <Symbol symbol={match.params.symbol}/>}
      />
      </React.Fragment>
    </ChakraProvider>
  );
}

export default App;
