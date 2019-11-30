import React from "react";
import styled from "styled-components";
import { colors } from "../config";
import { speak } from "../utils/speech";

export default class PresentationPage extends React.Component {
  state = {
    text:
      "John Brown Computer Science and Software Engineering, First Class Degree"
  };

  render() {
    const { text } = this.state;
    return (
      <Container>
        <Text>Presentation</Text>
        <Textbox
          type="text"
          name="Type something"
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <Text
          onClick={() => {
            speak(text);
          }}
        >
          Speak
        </Text>
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 36px;
  color: ${colors.red};
  padding: 18px;
`;

const Textbox = styled.input`
  width: 200px;
`;
