import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

// linear(135deg, #CB5EEE 0%, #4BE1EC 100%);
const theme = extendTheme({
  colors: {
    black: "#1a202c",
    purple: "#CB5EEE",
    pink: "#4BE1EC",
    // gradient: "linear(to-l, #7928CA, #FF0080)",
    gradient: "linear(135deg, #CB5EEE 0%, #4BE1EC 100%)",
  },
  fonts,
  breakpoints,
});

export default theme;
