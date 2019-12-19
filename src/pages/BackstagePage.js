import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../config";
import { fetchQueue } from "../store/queue/actions";

class BackstagePage extends React.Component {
  componentDidMount() {
    this.props.fetchQueue();
    // setInterval(this.props.fetchQueue, 20000);
  }

  render() {
    const { queue, loading, error } = this.props;
    console.log(loading);
    return (
      <Container>
        <Header>
          Next 6 students
          {loading && <SmallLabel>Loading...</SmallLabel>}
        </Header>

        <CardsContainer>
          {Array.isArray(queue) &&
            queue.map((student, index) => (
              <Card key={index}>
                <Name>{student.name}</Name>
                <Name>{student.subject}</Name>
                <Name>{student.qualification}</Name>
              </Card>
            ))}
        </CardsContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(BackstagePage);

const Container = styled.div`
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 60px;
  color: ${colors.red};
  width: 740px;
  align-items: flex-end;
  padding: 18px;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
`;

const SmallLabel = styled.div`
  font-size: 16px;
  color: ${colors.white};
  display: flex;
  flex-direction: row;
`;

const CardsContainer = styled.div`
  position: relative;
  height: 500px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  height: 200px;
  width: 225px;
  background: ${colors.red};
  color: ${colors.white};
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`;

const Name = styled.div`
  width: 100%;
  height: 20px;
  text-align: center;
  margin-top: 10px;
`;
