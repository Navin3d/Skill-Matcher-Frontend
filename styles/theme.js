import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "light" ? "#e2e8f0" : "#171923",
    },
  }),
};

const colors = {
  dark: {
    900: "#151515",
    800: "#1d1d1d",
    700: "#252525",
  },
  text: {
    900: "#fff",
    800: "#cacaca",
    700: "#838383",
  },
};

const theme = extendTheme({ config, styles, colors });

export default theme;
