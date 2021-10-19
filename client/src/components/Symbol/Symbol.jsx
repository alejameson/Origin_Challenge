import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useDispatch, useSelector } from "react-redux";
import { getActionBySymbol, getActionData } from "../../actions";

export default function Symbol({ symbol }) {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      categories: ["15", "B", "C"],
    },
    series: [{ data: [1, 2, 3] }],
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

  const actionBySymbol = useSelector((state) => state.actionBySymbol);
  const actionData = useSelector((state) => state.actionData);

  const user = useSelector((state) => state.user);

  console.log(symbol, "SYUMBOL NAME");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActionBySymbol(symbol));
    dispatch(getActionData(symbol))
  }, [dispatch]);

  const updateSeries = () => {
    setChartOptions({ 
      xAxis:{ categories : actionData != "" ? actionData.slice(0,3).map((a) => a.datetime.substr(-8,5)) : "" },
      series: [
          { data: [Math.random() * 5, 2, 1]} /* actionData != "" ? actionData.slice(0,3).map((a) => a.open) : "" */
        ]
    });
    console.log(chartOptions, "XAXIS")
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
      <RadioGroup
        w="80vh" /* bg="black" */ /* onChange={setValue} value={value} */
      >
        <VStack direction="row" w="80vh">
          <HStack>
            <Radio value="2">Tiempo Real</Radio>
            <Text>(Grafico de cotizacion en tiempo real)</Text>
          </HStack>
          <HStack w="50vh">
            <Radio value="1" w="20vh">
              Historial
            </Radio>
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </HStack>
        </VStack>
      </RadioGroup>
    </VStack>
    <Box>
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
    <h3>Hovering over {hoverData}</h3>
    <button onClick={updateSeries}>Update Series</button>
  </Box>
  </Box>
  );
}
