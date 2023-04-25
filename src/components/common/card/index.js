import { Box, Button, Flex, useBreakpointValue, useColorModeValue, VStack } from "@chakra-ui/react";
import CardTitle from "./cardTitle";

const Card = ({ title, children, spacing, customStyles, component, editBtn }) => {
  return (
    <Box
      py={{
        base: "4",
        sm: "8"
      }}
      px={{
        base: "4",
        sm: "10",
      }}
      bg={useBreakpointValue({
        base: useColorModeValue("#fff", "#1a202c"),
        sm: useColorModeValue("#fff", "#1a202c"),
      })}
      boxShadow={{
        base: "none",
        sm: useColorModeValue("lg", "lg"),
      }}
      borderRadius={{
        base: "xl",
        // sm: "xl",
      }}
      {...customStyles}
    >
      <VStack align="strech" spacing={spacing}>
        <Flex marginBottom={"10px"} justifyContent={"space-between"}>
          {title ? <CardTitle component={component} title={title} /> : null}
          {editBtn}
        </Flex>
        {children}
      </VStack>
    </Box>
  );
};

export default Card;
