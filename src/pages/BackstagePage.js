import React from "react";
import styled from "styled-components";
import { colors } from "../config";

export default () => (
  <Container>
    <Text>Backstage</Text>
  </Container>
);

const Container = styled.div`
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: ${({ size }) => (size ? size : 36)}px;
  color: ${colors.red};
  padding: ${({ size }) => (size ? size / 2 : 18)}px;
`;
