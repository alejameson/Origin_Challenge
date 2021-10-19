import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useDispatch, useSelector } from "react-redux";
import { getActionBySymbol, getActionData } from "../../actions";

export default function Symbol({ symbol }) {
  const [hoverData, setHoverData] = useState(null);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      categories: ["15", "B", "C"] /* ["15", "B", "C"] */,
    },
    series: [{ data: "" }] /* [1, 2, 3] */,
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category);
            },
          },
        },
      },
    },
  });

  console.log(value, "valUEUEUE");

  const actionBySymbol = useSelector((state) => state.actionBySymbol);
  const actionData = useSelector((state) => state.actionData);
  const user = useSelector((state) => state.user);

  const actionDataDate = actionData ? actionData.slice(0, 10).map((a) => a.datetime.substr(-8, 5)) : "";
  const actionOpen = actionData ? actionData.slice(0, 10).map((a) => a.open.substr(0, 4)) : "";
  const open = actionOpen.length ? actionOpen.map(a => Number(a)) : "";
  console.log(open, "ACTION DATA OPEN");

  console.log(symbol, "SYUMBOL NAME");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActionBySymbol(symbol));
    dispatch(getActionData(symbol));
  }, [dispatch]);

  const updateSeries = () => {
    if (value === "RealTime") {
      setChartOptions({
        xAxis: {
          categories:
          actionDataDate ? actionDataDate : "",
        },
        series: [
          {
            data: open.length ? open : "",
          } /* actionData != "" ? actionData.slice(0,3).map((a) => a.open) : "" */,
        ],
      });
    }else if (value === "History"){
      console.log(filter, "FILTER")
    }
    console.log(chartOptions, "XAXIS");
  };

  const handleOnFilterChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <Box>
      <VStack>
        <Flex bgColor="telegram.100" w="100%" justifyContent="space-between">
          <Flex margin="1em">
            {actionBySymbol != "" ? (
              <Text fontSize="3xl">
                {actionBySymbol[0].symbol} - {actionBySymbol[0].name} -{" "}
                {actionBySymbol[0].currency}
              </Text>
            ) : (
              ""
            )}
          </Flex>
          <Flex margin="1em">
            <Text fontSize="3xl"> Usuario: {user.name}</Text>
          </Flex>
        </Flex>
        <RadioGroup w="80vh" onChange={setValue} value={value}>
          <VStack direction="row" w="80vh">
            <HStack>
              <Radio value="RealTime">Tiempo Real</Radio>
              <Text>(Grafico de cotizacion en tiempo real)</Text>
            </HStack>
            <HStack w="50vh">
              <Radio value="History" w="20vh">
                Historial
              </Radio>
              <Select placeholder="Desde" onChange={handleOnFilterChange}>
                <option value="option1">30 min</option>
                <option value="option2">35 min</option>
                <option value="option3">40 min</option>
              </Select>
              <Select placeholder="Hasta" onChange={handleOnFilterChange}>
                <option value="option1">5 min</option>
                <option value="option2">10</option>
                <option value="option3">15</option>
              </Select>
            </HStack>
          </VStack>
        </RadioGroup>
      </VStack>
      <Box>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        <h3>Hovering over {hoverData}</h3>
        <Button colorScheme="telegram" onClick={updateSeries}>
          Graficar Cotizacion
        </Button>
      </Box>
    </Box>
  );
}
