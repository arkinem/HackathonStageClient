import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../config";
import posed from "react-pose";
import { withRouter } from "react-router";
import { fetchQueue } from "../store/queue/actions";

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchQueue();
    setInterval(this.props.fetchQueue, 20000);
  }

  render() {
    const { history } = this.props;

    return (
      <Container>
        <Card onClick={() => history.push("/presentation")}>Presentation</Card>
        <Card onClick={() => history.push("/backstage")}>Backstage</Card>
      </Container>
    );
  }
}

const mapStateToProps = ({ queue }) => ({
  queue: queue.queue,
  loading: queue.loading,
  error: queue.error
});

const mapDispatchToProps = dispatch => ({
  fetchQueue: () => dispatch(fetchQueue())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));

const Container = styled.div`
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.red};
  height: 100vh;
  flex-direction: row;
`;

const AnimatedCard = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1.1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
  },
  press: {
    scale: 1.05,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
  }
});

const Card = styled(AnimatedCard)`
  background-color: ${colors.red};
  display: flex;
  width: 300px;
  height: 200px;
  margin: 20px;
  color: ${colors.white};
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 26px;
  letter-spacing: 1px;
`;
