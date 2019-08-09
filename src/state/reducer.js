// @flow

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import paymentRequest from "./payment-request/payment-request.reducer";
import history from "./history";

type State = {};
const reducers = {
  router: connectRouter(history),
  paymentRequest
};

export default combineReducers<typeof reducers, State>(reducers);
