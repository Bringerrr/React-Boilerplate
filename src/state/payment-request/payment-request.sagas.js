// @flow

import {
  put, all, call, select, takeLatest,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  loadPaymentRequestsSuccess,
  loadPaymentRequestsError,
  editPaymentRequestSuccess,
  editPaymentRequestError,
  loadPaymentRemindersSuccess,
  loadPaymentRemindersError,
  editPaymentRemindersSuccess,
  editPaymentRemindersError,
  loadCustomerPaymentRequestSuccess,
  loadCustomerPaymentRequestError,
  createPaymentRequestSuccess,
  createPaymentRequestError,
  loadPaymentRequestByIdSuccess,
  loadPaymentRequestByIdError,
  applyPaymentRequestActionSuccess,
  applyPaymentRequestActionError,
} from './payment-request.actions';
import {
  approvePaymentRequest,
  createPaymentRequest,
  editPaymentRequest,
  loadPaymentRequestById,
  loadPaymentRequests,
  loadPaymentReminders,
  editPaymentReminders,
  loadCustomerPaymentRequest,
  reportPaymentRequest,
} from './payment-request.api';
import {
  APPLY_PAYMENT_REQUEST_ACTION_INIT,
  CREATE_PAYMENT_REQUEST_INIT,
  EDIT_PAYMENT_REQUEST_INIT,
  LOAD_PAYMENT_REQUEST_BY_ID_INIT,
  LOAD_PAYMENT_REQUESTS_INIT,
  LOAD_PAYMENT_REQUESTS_SORT_INIT,
  LOAD_PAYMENT_REQUESTS_DESC_INIT,
  LOAD_PAYMENT_REMINDERS_INIT,
  EDIT_PAYMENT_REMINDERS_INIT,
  EDIT_PAYMENT_REMINDERS_SUCCESS,
  LOAD_CUSTOMER_PAYMENT_REQUEST_INIT,
} from './payment-request.types';
import type {
  ApplyPaymentRequestActionInitAction,
  CreatePaymentRequestInitAction,
  EditPaymentRequestInitAction,
  LoadPaymentRequestByIdInitAction,
  LoadPaymentRequestsInitAction,
  LoadPaymentRemindersInitAction,
  EditPaymentRemindersInitAction,
  PaymentRequestTableData,
} from './payment-request.types';
import type { PagedResponse } from '../types';

function* loadPaymentRequestByIdSaga({ payload: id }: LoadPaymentRequestByIdInitAction): Saga<void> {
  try {
    const paymentRequest: PaymentRequestTableData = yield call(loadPaymentRequestById, id);
    yield put(loadPaymentRequestByIdSuccess(paymentRequest));
  } catch (error) {
    yield put(loadPaymentRequestByIdError(error));
  }
}

function* editPaymentRequestSaga({ payload: params }: EditPaymentRequestInitAction): Saga<void> {
  try {
    const response: any = yield call(editPaymentRequest, params);
    yield put(editPaymentRequestSuccess({ response, params }));
  } catch (error) {
    yield put(editPaymentRequestError(error));
  }
}

function* loadPaymentRemindersSaga({ payload: page }: LoadPaymentRemindersInitAction): Saga<void> {
  try {
    const response: any = yield call(loadPaymentReminders, page);
    yield put(loadPaymentRemindersSuccess(response));
  } catch (error) {
    yield put(loadPaymentRemindersError(error));
  }
}

function* editPaymentRemindersSaga({ payload: params }: EditPaymentRemindersInitAction): Saga<void> {
  const { id, nextStatus } = params;
  try {
    const response: any = yield call(editPaymentReminders, id, nextStatus);
    yield put(editPaymentRemindersSuccess({ response, params }));
  } catch (error) {
    yield put(editPaymentRemindersError(error));
  }
}

function* updatePaymentRemindersSaga(): Saga<void> {
  const maxPage = yield select(state => state.paymentRequest.customerPaymentReminders.maxPage);
  try {
    const response: any = yield call(loadPaymentReminders, maxPage);
    yield put(loadPaymentRemindersSuccess(response));
  } catch (error) {
    yield put(loadPaymentRemindersError(error));
  }
}

function* loadPaymentRequestsSaga({ payload: collectionParams }: LoadPaymentRequestsInitAction): Saga<void> {
  try {
    const response: PagedResponse<PaymentRequestTableData> = yield call(loadPaymentRequests, collectionParams);
    const { append } = collectionParams;
    yield put(loadPaymentRequestsSuccess(response, append));
  } catch (error) {
    yield put(loadPaymentRequestsError(error));
  }
}

// function* updatePaymentRequestSaga(): Saga<void> {
//   const sorted = true;
//   const collectionParams = yield select(state => state.paymentRequest.customerPaymentReminders.maxPage);
//   try {
//     const response: any = yield call(loadPaymentRequests, collectionParams);
//     yield put(loadPaymentRequestsSuccess(response, sorted));
//   } catch (error) {
//     yield put(loadPaymentRequestsError(error));
//   }
// }

function* loadCustomerPaymentRequestSaga({ payload: collectionParams }: LoadPaymentRequestsInitAction): Saga<void> {
  try {
    const response: PagedResponse<PaymentRequestTableData> = yield call(loadCustomerPaymentRequest, collectionParams);
    yield put(loadCustomerPaymentRequestSuccess(response));
  } catch (error) {
    yield put(loadCustomerPaymentRequestError(error));
  }
}

function* createPaymentRequestSaga({ payload: paymentRequest }: CreatePaymentRequestInitAction): Saga<void> {
  try {
    yield call(createPaymentRequest, paymentRequest);
    yield put(createPaymentRequestSuccess());
  } catch (error) {
    yield put(createPaymentRequestError(error));
  }
}

function* applyPaymentRequestActionSaga({ payload: type }: ApplyPaymentRequestActionInitAction): Saga<void> {
  try {
    const id = yield select(state => state.paymentRequest.current.id);
    yield call(type === 'APPROVE' ? approvePaymentRequest : reportPaymentRequest, id);
    yield put(applyPaymentRequestActionSuccess());
  } catch (error) {
    yield put(applyPaymentRequestActionError(error));
  }
}

export default function* (): Saga<void> {
  return yield all([
    takeLatest(CREATE_PAYMENT_REQUEST_INIT, createPaymentRequestSaga),
    takeLatest(LOAD_PAYMENT_REQUEST_BY_ID_INIT, loadPaymentRequestByIdSaga),
    takeLatest(EDIT_PAYMENT_REQUEST_INIT, editPaymentRequestSaga),
    takeLatest(EDIT_PAYMENT_REMINDERS_SUCCESS, updatePaymentRemindersSaga),
    takeLatest(LOAD_PAYMENT_REQUESTS_INIT, loadPaymentRequestsSaga),
    takeLatest(LOAD_PAYMENT_REQUESTS_SORT_INIT, loadPaymentRequestsSaga),
    takeLatest(LOAD_PAYMENT_REQUESTS_DESC_INIT, loadPaymentRequestsSaga),
    takeLatest(LOAD_PAYMENT_REMINDERS_INIT, loadPaymentRemindersSaga),
    takeLatest(EDIT_PAYMENT_REMINDERS_INIT, editPaymentRemindersSaga),
    takeLatest(LOAD_CUSTOMER_PAYMENT_REQUEST_INIT, loadCustomerPaymentRequestSaga),
    takeLatest(APPLY_PAYMENT_REQUEST_ACTION_INIT, applyPaymentRequestActionSaga),
  ]);
}
