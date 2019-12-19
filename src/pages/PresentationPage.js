import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../config";
import { speak } from "../utils/speech";
import { fetchQueue, removeFromQueue } from "../store/queue/actions";
import moment from "moment";

class PresentationPage extends React.Component {
  componentDidMount = async () => {
    const { queue } = this.props;
    if (Array.isArray(queue) && queue.length > 0) {
      await this.annouceStudent(queue[0]);
    }
  };

  componentDidUpdate = async prevProps => {
    if (
      prevProps.queue.length !== this.props.queue.length ||
      (prevProps.queue.length > 0 &&
        this.props.queue.length > 0 &&
        prevProps.queue[0].name !== this.props.queue[0].name)
    ) {
      console.log(
        moment().toISOString() +
          " new student on the screen " +
          this.props.queue[0].name
      );

      await this.annouceStudent(this.props.queue[0]);
    }
  };

  annouceStudent = async student => {
    const { name, subject, qualification } = student;
    console.log("start speaking");
    await speak(`${name} ${subject} ${qualification}`);
    console.log("end speaking");
    this.props.removeFromQueue();
  };

  render() {
    const { queue } = this.props;

    return (
      <Container>
        {Array.isArray(queue) && queue.length > 0 && (
          <Content>
            <PhotoContainer>Photo</PhotoContainer>
            <DetailsContainer>
              <Name>{queue[0].name}</Name>
              <Subject>{queue[0].subject}</Subject>
              <Qualification>{queue[0].qualification}</Qualification>
            </DetailsContainer>
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ queue }) => ({
  queue: queue.queue,
  loading: queue.loading,
  error: queue.error,
  removeLoading: queue.removeLoading,
  removeError: queue.removeError,
  removeSuccess: queue.removeSuccess
});

const mapDispatchToProps = dispatch => ({
  fetchQueue: () => dispatch(fetchQueue()),
  removeFromQueue: () => dispatch(removeFromQueue())
});

export default connect(mapStateToProps, mapDispatchToProps)(PresentationPage);

const Container = styled.div`
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  width: 900px;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PhotoContainer = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background: ${colors.white};
  border: 5px solid ${colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailsContainer = styled.div`
  flex: 1;
  height: 100%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 66px;
  width: 100%;
  color: ${colors.red};
  padding: 18px;
`;

const Subject = styled(Name)`
  font-size: 30px;
`;

const Qualification = styled(Name)`
  font-size: 30px;
`;
