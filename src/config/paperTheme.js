import { DefaultTheme } from "react-native-paper";
import colors from "./colors";

export default theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
