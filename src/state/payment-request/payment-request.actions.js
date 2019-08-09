// @flow

import {
  APPLY_PAYMENT_REQUEST_ACTION_ERROR,
  APPLY_PAYMENT_REQUEST_ACTION_INIT,
  APPLY_PAYMENT_REQUEST_ACTION_SUCCESS,
  CREATE_PAYMENT_REQUEST_ERROR,
  CREATE_PAYMENT_REQUEST_INIT,
  CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS,
  CREATE_PAYMENT_REQUEST_SUCCESS,
  LOAD_PAYMENT_REQUEST_BY_ID_ERROR,
  LOAD_PAYMENT_REQUEST_BY_ID_INIT,
  LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS,
  LOAD_PAYMENT_REQUESTS_ERROR,
  LOAD_PAYMENT_REQUESTS_INIT,
  LOAD_PAYMENT_REQUESTS_SUCCESS,
  EDIT_PAYMENT_REQUEST_SUCCESS,
  EDIT_PAYMENT_REQUEST_ERROR,
  EDIT_PAYMENT_REQUEST_INIT,
  LOAD_PAYMENT_REMINDERS_ERROR,
  LOAD_PAYMENT_REMINDERS_INIT,
  LOAD_PAYMENT_REMINDERS_SUCCESS,
  EDIT_PAYMENT_REMINDERS_ERROR,
  EDIT_PAYMENT_REMINDERS_INIT,
  EDIT_PAYMENT_REMINDERS_SUCCESS,
  LOAD_CUSTOMER_PAYMENT_REQUEST_INIT,
  LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS,
  LOAD_CUSTOMER_PAYMENT_REQUEST_ERROR,
  LOAD_PAYMENT_REMINDER_STATUSES_INIT,
  LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS,
  LOAD_PAYMENT_REMINDER_STATUSES_ERROR,
} from './payment-request.types';
import type {
  ApplyPaymentRequestActionErrorAction,
  ApplyPaymentRequestActionInitAction,
  ApplyPaymentRequestActionSuccessAction,
  CreatePaymentRequestErrorAction,
  CreatePaymentRequestInitAction,
  CreatePaymentRequestSetDefaultPropsAction,
  CreatePaymentRequestSuccessAction,
  LoadPaymentRequestByIdErrorAction,
  LoadPaymentRequestByIdInitAction,
  LoadPaymentRequestByIdSuccessAction,
  LoadPaymentRequestsErrorAction,
  LoadPaymentRequestsInitAction,
  LoadPaymentRequestsSuccessAction,
  EditPaymentRequestErrorAction,
  EditPaymentRequestInitAction,
  EditPaymentRequestSuccessAction,
  LoadPaymentRemindersErrorAction,
  LoadPaymentRemindersInitAction,
  LoadPaymentRemindersSuccessAction,
  EditPaymentRemindersErrorAction,
  EditPaymentRemindersInitAction,
  EditPaymentRemindersSuccessAction,
  LoadCustomerPaymentRequestInitAction,
  LoadCustomerPaymentRequestSuccessAction,
  LoadCustomerPaymentRequestErrorAction,
  PaymentRequestTableData,
  PaymentRequestActionType,
  CustomerPaymentRequest,
  PaymentReminder,
  PaymentRequestInfo,
  LoadPaymentReminderStatusesInitAction,
  LoadPaymentReminderStatusesSuccessAction,
  LoadPaymentReminderStatusesError,
} from './payment-request.types';
import type { PagedResponse, SortDirectionType } from '../types';

export const loadPaymentRequestsInit = (
  offset: number,
  limit: number,
  sort: string,
  direction: SortDirectionType,
  append: boolean,
): LoadPaymentRequestsInitAction => ({
  type: LOAD_PAYMENT_REQUESTS_INIT,
  payload: {
    offset,
    limit,
    sort,
    direction,
    append,
  },
});

type LPRST = LoadPaymentRequestsSuccessAction;
export const loadPaymentRequestsSuccess = (
  response: PagedResponse<PaymentRequestTableData>,
  append: boolean,
): LPRST => ({
  type: LOAD_PAYMENT_REQUESTS_SUCCESS,
  payload: { response, append },
});

export const editPaymentRequestInit = (paymentRequest: PaymentRequestInfo): EditPaymentRequestInitAction => ({
  type: EDIT_PAYMENT_REQUEST_INIT,
  payload: paymentRequest,
});

export const editPaymentRequestSuccess = (response: PaymentReminder): EditPaymentRequestSuccessAction => ({
  type: EDIT_PAYMENT_REQUEST_SUCCESS,
  payload: response,
});

export const editPaymentRequestError = (error: any): EditPaymentRequestErrorAction => ({
  type: EDIT_PAYMENT_REQUEST_ERROR,
  payload: error,
});

export const loadPaymentRequestsError = (error: any): LoadPaymentRequestsErrorAction => ({
  type: LOAD_PAYMENT_REQUESTS_ERROR,
  payload: error,
});

export const loadPaymentRemindersInit = (page: number): LoadPaymentRemindersInitAction => ({
  type: LOAD_PAYMENT_REMINDERS_INIT,
  payload: page,
});

export const loadPaymentRemindersError = (error: any): LoadPaymentRemindersErrorAction => ({
  type: LOAD_PAYMENT_REMINDERS_ERROR,
  payload: error,
});

export const loadPaymentRemindersSuccess = (response: PaymentReminder): LoadPaymentRemindersSuccessAction => ({
  type: LOAD_PAYMENT_REMINDERS_SUCCESS,
  payload: response,
});

export const editPaymentRequestsError = (error: any): LoadPaymentRequestsErrorAction => ({
  type: LOAD_PAYMENT_REQUESTS_ERROR,
  payload: error,
});

export const editPaymentRemindersInit = (
  id: number,
  prevStatus: string,
  nextStatus: string,
  prevIndex: number,
  nextIndex: Number,
): EditPaymentRemindersInitAction => ({
  type: EDIT_PAYMENT_REMINDERS_INIT,
  payload: {
    id,
    prevStatus,
    nextStatus,
    prevIndex,
    nextIndex,
  },
});

export const editPaymentRemindersSuccess = (response: PaymentReminder): EditPaymentRemindersSuccessAction => ({
  type: EDIT_PAYMENT_REMINDERS_SUCCESS,
  payload: response,
});

export const editPaymentRemindersError = (error: any): EditPaymentRemindersErrorAction => ({
  type: EDIT_PAYMENT_REMINDERS_ERROR,
  payload: error,
});

export const loadCustomerPaymentRequestInit = (id: number): LoadCustomerPaymentRequestInitAction => ({
  type: LOAD_CUSTOMER_PAYMENT_REQUEST_INIT,
  payload: id,
});

export const loadCustomerPaymentRequestSuccess = (
  response: CustomerPaymentRequest,
): LoadCustomerPaymentRequestSuccessAction => ({
  type: LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS,
  payload: response,
});

export const loadCustomerPaymentRequestError = (error: any): LoadCustomerPaymentRequestErrorAction => ({
  type: LOAD_CUSTOMER_PAYMENT_REQUEST_ERROR,
  payload: error,
});

export const createPaymentRequestInit = (request: PaymentRequestTableData): CreatePaymentRequestInitAction => ({
  type: CREATE_PAYMENT_REQUEST_INIT,
  payload: request,
});

export const createPaymentRequestSuccess = (): CreatePaymentRequestSuccessAction => ({
  type: CREATE_PAYMENT_REQUEST_SUCCESS,
});

export const createPaymentRequestError = (error: any): CreatePaymentRequestErrorAction => ({
  type: CREATE_PAYMENT_REQUEST_ERROR,
  payload: error,
});

export const createPaymentSetDefaultProps = (): CreatePaymentRequestSetDefaultPropsAction => ({
  type: CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS,
});

export const loadPaymentRequestByIdInit = (id: number): LoadPaymentRequestByIdInitAction => ({
  type: LOAD_PAYMENT_REQUEST_BY_ID_INIT,
  payload: id,
});

type LPRISA = LoadPaymentRequestByIdSuccessAction;
export const loadPaymentRequestByIdSuccess = (paymentRequest: PaymentRequestTableData): LPRISA => ({
  type: LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS,
  payload: paymentRequest,
});

export const loadPaymentRequestByIdError = (error: any): LoadPaymentRequestByIdErrorAction => ({
  type: LOAD_PAYMENT_REQUEST_BY_ID_ERROR,
  payload: error,
});

export const applyPaymentRequestActionInit = (type: PaymentRequestActionType): ApplyPaymentRequestActionInitAction => ({
  type: APPLY_PAYMENT_REQUEST_ACTION_INIT,
  payload: type,
});

export const applyPaymentRequestActionSuccess = (): ApplyPaymentRequestActionSuccessAction => ({
  type: APPLY_PAYMENT_REQUEST_ACTION_SUCCESS,
});

export const applyPaymentRequestActionError = (error: any): ApplyPaymentRequestActionErrorAction => ({
  type: APPLY_PAYMENT_REQUEST_ACTION_ERROR,
  payload: error,
});

export const loadPaymentReminderStatusesInit = (): LoadPaymentReminderStatusesInitAction => ({
  type: LOAD_PAYMENT_REMINDER_STATUSES_INIT,
});

export const loadPaymentReminderStatusesSuccess = (statuses: any): LoadPaymentReminderStatusesSuccessAction => ({
  type: LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS,
  payload: statuses,
});
export const loadPaymentReminderStatusesError = (error: any): LoadPaymentReminderStatusesError => ({
  type: LOAD_PAYMENT_REMINDER_STATUSES_ERROR,
  payload: error,
});
