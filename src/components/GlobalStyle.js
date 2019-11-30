import { createGlobalStyle } from "styled-components";
import { colors } from "../config";

export default createGlobalStyle`
  body {
    font-family: 'Source Sans Pro' !important;
    background-color: ${colors.black}
  }
`;
