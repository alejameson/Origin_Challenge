import { Input } from "@chakra-ui/input";
import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import "./Autocomplete.css";
import { useDispatch, useSelector } from "react-redux";
import { addAction, addActionsUser, getAllActions, getUser } from "../../actions";
import { useHistory } from "react-router";

const Autocomplete = ({ lang }) => {
  const [action, setAction] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);

  const handleChange = (e) => {
    let searchval = e.target.value;
    let suggestion = [];
    if (searchval.length > 0) {
      suggestion = lang
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
    console.log(value);
    setSearchtext(value);
    setSuggest([]);
    setAction(value);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return <p>Simbolo no encontrado</p>;
    }

    return (
      <ul>
        {suggest.map((item, index) => {
          return (
            <div key={index}>
              <li onClick={() => suggestedText(item)}>{item}</li>
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </ul>
    );
  };

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const { push } = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    const obj = {
      userName: user.userName,
      symbol: action,
    }
    dispatch(addAction(obj));
    dispatch(addActionsUser(action));
    /* dispatch(getUser()); */
    /* push("/"); */
    /* dispatch(getAllActions()); */
  }

  return (
    <div className="searchcontainer">
      <Input
        type="text"
        placeholder="Search.."
        className="search"
        value={searchtext}
        onChange={handleChange}
      />
      <Flex justifyContent="center">
      <Button colorScheme="telegram" onClick={(e) => handleClick(e)}>➕ AGREGAR SIMBOLO</Button>
      </Flex>
      {getSuggestions()}
      {/* <Flex justifyContent="center">
      <Button colorScheme="telegram" onClick={handleOnClick}>➕ AGREGAR SIMBOLO</Button>
      </Flex> */}
    </div>
  );
};
export default Autocomplete;