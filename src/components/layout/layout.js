import Header from "./header";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box w="100%" maxW="1440px" mx="auto">
        <Box px={4}>
          <Box py="20px" mt={[120, 120, 90]}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
