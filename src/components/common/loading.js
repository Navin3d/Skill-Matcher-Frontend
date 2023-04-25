import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading({ customStyles }) {
  return (
    <Flex w="100%" justifyContent="center" {...customStyles}>
      <Spinner size="xl" />
    </Flex>
  );
}
