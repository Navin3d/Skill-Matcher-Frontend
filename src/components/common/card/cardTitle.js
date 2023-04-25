import { Text } from "@chakra-ui/react";

const CardTitle = ({ title, component }) => {
  return (
    <Text fontWeight="500" fontSize="24px">
      {title} {component}
    </Text>
  );
};

export default CardTitle;
