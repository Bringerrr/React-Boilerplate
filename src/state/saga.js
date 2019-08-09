// @flow

import { all, call } from "redux-saga/effects";
import type { Saga } from "redux-saga";

import paymentRequestSagas from "./payment-request/payment-request.sagas";

export default function* rootSaga(): Saga<void> {
  yield all([call(paymentRequestSagas)]);
}
