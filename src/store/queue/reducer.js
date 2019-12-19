import * as actions from "./actions";

const initialState = {
  queue: [],
  loading: false,
  error: null,
  removeLoading: false,
  removeError: null,
  removeSuccess: false
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_QUEUE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.FETCH_QUEUE_SUCCESS:
      return {
        ...state,
        loading: false,
        queue: action.payload.queue
      };
    case actions.FETCH_QUEUE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actions.REMOVE_FROM_QUEUE_BEGIN:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeError: null
      };
    case actions.REMOVE_FROM_QUEUE_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true
      };
    case actions.REMOVE_FROM_QUEUE_FAILURE:
      return {
        ...state,
        removeLoading: false,
        removeError: action.payload.error
      };
    default:
      return state;
  }
}
