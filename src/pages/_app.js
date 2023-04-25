import "../../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme";
import { Provider } from "react-redux";
import store from "../store";
import { PrivateRoutes, ErrorsHandler } from "../hoc";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PrivateRoutes>
          <ErrorsHandler>
            <Component {...pageProps} />
          </ErrorsHandler>
        </PrivateRoutes>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
