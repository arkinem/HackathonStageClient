import axios from "axios";
import moment from "moment";

export const FETCH_QUEUE_BEGIN = "FETCH_QUEUE_BEGIN";
export const FETCH_QUEUE_SUCCESS = "FETCH_QUEUE_SUCCESS";
export const FETCH_QUEUE_FAILURE = "FETCH_QUEUE_FAILURE";
export const REMOVE_FROM_QUEUE_BEGIN = "REMOVE_FROM_QUEUE_BEGIN";
export const REMOVE_FROM_QUEUE_SUCCESS = "REMOVE_FROM_QUEUE_SUCCESS";
export const REMOVE_FROM_QUEUE_FAILURE = "REMOVE_FROM_QUEUE_FAILURE";

export const fetchQueue = () => {
  const fetchQueueBegin = () => ({
    type: FETCH_QUEUE_BEGIN
  });

  const fetchQueueSuccess = queue => ({
    type: FETCH_QUEUE_SUCCESS,
    payload: { queue }
  });

  const fetchQueueFailure = error => ({
    type: FETCH_QUEUE_FAILURE,
    payload: { error }
  });

  return async dispatch => {
    dispatch(fetchQueueBegin());

    await sleep(2000);
    const config = {
      method: "GET",
      url: "localhost/sth/TODO",
      json: true
    };

    try {
      // const { data } = await axios(config);
      const data = JSON.parse(JSON.stringify(shuffle(fakeData)));
      dispatch(fetchQueueSuccess(data));
    } catch (error) {
      dispatch(fetchQueueFailure(error.response));
    }
  };
};

const fakeData = [
  {
    name: "Mateusz Kitlinski",
    subject: "Computer Science",
    qualification: "First class",
    photo: "cdnLinkToDo"
  },
  {
    name: "Blazej Golinski",
    subject: "Software Engineering",
    qualification: "First class",
    photo: "cdnLinkToDo"
  },
  {
    name: "Boguslaw Smolarczyk",
    subject: "Computer Forensics",
    qualification: "First class",
    photo: "cdnLinkToDo"
  },
  {
    name: "Kamil Swiniarski",
    subject: "Software Engineering",
    qualification: "First class",
    photo: "cdnLinkToDo"
  },
  {
    name: "John Smith",
    subject: "Computer Forensics",
    qualification: "Second class",
    photo: "cdnLinkToDo"
  },
  {
    name: "Alice Garcia",
    subject: "Accounting and Finance",
    qualification: "Third class",
    photo: "cdnLinkToDo"
  }
];

function shuffle(array) {
  return JSON.parse(JSON.stringify(array)).sort(() => Math.random() - 0.5);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const removeFromQueue = () => {
  console.log("function called");
  const removeFromQueueBegin = () => ({
    type: REMOVE_FROM_QUEUE_BEGIN
  });

  const removeFromQueueSuccess = () => ({
    type: REMOVE_FROM_QUEUE_SUCCESS,
    payload: { removed: true }
  });

  const removeFromQueueFailure = error => ({
    type: REMOVE_FROM_QUEUE_FAILURE,
    payload: { error }
  });

  return async dispatch => {
    dispatch(removeFromQueueBegin());
    console.log(moment().toISOString() + "  removing from queue...");
    await sleep(2000);
    const config = {
      method: "POST", //put patch whatever
      url: "localhost/sth/TODO", //idk yet
      json: true
    };

    try {
      //  await axios(config);

      dispatch(removeFromQueueSuccess());
      await sleep(6000);
      dispatch(fetchQueue());
      console.log(moment().toISOString() + "  removed.");
    } catch (error) {
      dispatch(removeFromQueueFailure(error.response));
    }
  };
};
