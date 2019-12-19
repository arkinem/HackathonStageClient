import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import queueReducer from "./queue/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      queue: queueReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
