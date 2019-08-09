// @flow

import type { SortDirectionType, CollectionParams } from "state/types";
import type { CurrencyType, PagedResponse, Pagination } from "../types";
// import type { LoanLog } from '../loan/loan.types';
type LoanLog = any;

export const PaymentRequestStatus = {
  CREATED: "CREATED",
  READY_FOR_SIGNING: "READY_FOR_SIGNING",
  NOT_COMPLETE: "NOT_COMPLETE",
  VALIDATED: "VALIDATED",
  REJECTED: "REJECTED",
  CONFIRMED: "CONFIRMED",
  ERROR_STATUS: "ERROR_STATUS",
  REQUESTED: "REQUESTED",
  TERMINATED: "TERMINATED"
};

export const PaymentRemindersDashboardStatuses = {
  VERIFICATION_NEEDED: "READY_FOR_SIGNING",
  NOT_COMPLETE: "NOT_COMPLETE",
  APPROVED: "VALIDATED",
  FULLY_SERVICED: "TERMINATED"
};

export const Interactions = {
  LOAN_CREATED: "LOAN_CREATED",
  PAYMENT_CREATED: "PAYMENT_CREATED",
  PAYMENT_READY_FOR_SIGNING: "PAYMENT_READY_FOR_SIGNING",
  PAYMENT_NOT_COMPLETE: "PAYMENT_NOT_COMPLETE",
  PAYMENT_VALIDATED: "PAYMENT_VALIDATED",
  PAYMENT_REJECTED: "PAYMENT_REJECTED",
  PAYMENT_CONFIRMED: "PAYMENT_CONFIRMED",
  PAYMENT_TERMINATED: "PAYMENT_TERMINATED"
};

export type PaymentRequestStatusType = $Keys<typeof PaymentRequestStatus>;
export type InteractionTypes = $Keys<typeof Interactions>;

export type PaymentInteraction = {|
  message: string,
  eventHash: null,
  type: InteractionTypes,
  creationDate: Date,
  lastUpdateDate: Date
|};

export type PaymentRequestInfo = {|
  id: string,
  status: PaymentRequestStatusType,
  statusMessage: ?string,
  notaryEmail: ?string,
  notaryPhoneNumber: ?string,
  notaryFirstName: ?string,
  notaryLastName: ?string,
  paymentAmount: number,
  currency: CurrencyType | string,
  paymentInteractions: Array<LoanLog>,
  loanId: string,
  notaryId: ?string,
  paymentAmount: ?number | string,
  amount: ?number | string,
  status: any
|};

export type PaymentRequestTableData = {|
  id: number | string,
  amount: ?number,
  creationDate: number | string | Date,
  signatureDate: number | string | Date,
  currency: CurrencyType,
  loanId: number,
  status: string,
  notaryId: number
|};

export type CustomerPaymentRequest = {|
  id: number,
  notaryLastName: string,
  amount: number,
  currency: CurrencyType,
  status: PaymentRequestStatusType,
  statusMessage: string,
  signatureDate: string
|};

export type CustomerPaymentReminder = {|
  id: number,
  notaryLastName: string,
  amount: number,
  currency: CurrencyType,
  status: PaymentRequestStatusType,
  signatureDate: string
|};

export type PaymentRequestState = {|
  elements: Array<PaymentRequestTableData>,
  tableSort: {
    column: string,
    direction: SortDirectionType
  },
  pagination: Pagination,
  current: any,
  loadings: {
    table: boolean,
    info: boolean,
    actions: boolean,
    creation: boolean
  },
  customerPaymentRequest: ?CustomerPaymentRequest,
  customerPaymentReminders: any,
  remindersStatuses: Object,
  isCreated: boolean,
  error: any
|};

export type PaymentReminder = any;

export type PaymentRequestActionType = "APPROVE" | "REPORT";

// actions

export const CREATE_PAYMENT_REQUEST_INIT: "CREATE_PAYMENT_REQUEST_INIT" =
  "CREATE_PAYMENT_REQUEST_INIT";
export const CREATE_PAYMENT_REQUEST_SUCCESS: "CREATE_PAYMENT_REQUEST_SUCCESS" =
  "CREATE_PAYMENT_REQUEST_SUCCESS";
export const CREATE_PAYMENT_REQUEST_ERROR: "CREATE_PAYMENT_REQUEST_ERROR" =
  "CREATE_PAYMENT_REQUEST_ERROR";
export const CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS: "CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS" =
  "CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS"; // eslint-disable-line

export const EDIT_PAYMENT_REQUEST_INIT: "EDIT_PAYMENT_REQUEST_INIT" =
  "EDIT_PAYMENT_REQUEST_INIT";
export const EDIT_PAYMENT_REQUEST_SUCCESS: "EDIT_PAYMENT_REQUEST_SUCCESS" =
  "EDIT_PAYMENT_REQUEST_SUCCESS";
export const EDIT_PAYMENT_REQUEST_ERROR: "EDIT_PAYMENT_REQUEST_ERROR" =
  "EDIT_PAYMENT_REQUEST_ERROR";

export const EDIT_PAYMENT_REMINDERS_INIT: "EDIT_PAYMENT_REMINDERS_INIT" =
  "EDIT_PAYMENT_REMINDERS_INIT";
export const EDIT_PAYMENT_REMINDERS_SUCCESS: "EDIT_PAYMENT_REMINDERS_SUCCESS" =
  "EDIT_PAYMENT_REMINDERS_SUCCESS";
export const EDIT_PAYMENT_REMINDERS_ERROR: "EDIT_PAYMENT_REMINDERS_ERROR" =
  "EDIT_PAYMENT_REMINDERS_ERROR";

export const LOAD_PAYMENT_REMINDERS_INIT: "LOAD_PAYMENT_REMINDERS_INIT" =
  "LOAD_PAYMENT_REMINDERS_INIT";
export const LOAD_PAYMENT_REMINDERS_SUCCESS: "LOAD_PAYMENT_REMINDERS_SUCCESS" =
  "LOAD_PAYMENT_REMINDERS_SUCCESS";
export const LOAD_PAYMENT_REMINDERS_ERROR: "LOAD_PAYMENT_REMINDERS_ERROR" =
  "LOAD_PAYMENT_REMINDERS_ERROR";

export const LOAD_PAYMENT_REQUESTS_SORT_INIT: "LOAD_PAYMENT_REQUESTS_SORT_INIT" =
  "LOAD_PAYMENT_REQUESTS_SORT_INIT";
export const LOAD_PAYMENT_REQUESTS_DESC_INIT: "LOAD_PAYMENT_REQUESTS_DESC_INIT" =
  "LOAD_PAYMENT_REQUESTS_DESC_INIT";

export const LOAD_PAYMENT_REQUESTS_INIT: "LOAD_PAYMENT_REQUESTS_INIT" =
  "LOAD_PAYMENT_REQUESTS_INIT";
export const LOAD_PAYMENT_REQUESTS_SUCCESS: "LOAD_PAYMENT_REQUESTS_SUCCESS" =
  "LOAD_PAYMENT_REQUESTS_SUCCESS";
export const LOAD_PAYMENT_REQUESTS_ERROR: "LOAD_PAYMENT_REQUESTS_ERROR" =
  "LOAD_PAYMENT_REQUESTS_ERROR";

export const LOAD_CUSTOMER_PAYMENT_REQUEST_INIT: "LOAD_CUSTOMER_PAYMENT_REQUEST_INIT" =
  "LOAD_CUSTOMER_PAYMENT_REQUEST_INIT"; // eslint-disable-line
export const LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS: "LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS" =
  "LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS"; // eslint-disable-line
export const LOAD_CUSTOMER_PAYMENT_REQUEST_ERROR: "LOAD_CUSTOMER_PAYMENT_REQUEST_ERROR" =
  "LOAD_CUSTOMER_PAYMENT_REQUEST_ERROR"; // eslint-disable-line

export const LOAD_PAYMENT_REQUEST_BY_ID_INIT: "LOAD_PAYMENT_REQUEST_BY_ID_INIT" =
  "LOAD_PAYMENT_REQUEST_BY_ID_INIT";
export const LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS: "LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS" =
  "LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS"; // eslint-disable-line
export const LOAD_PAYMENT_REQUEST_BY_ID_ERROR: "LOAD_PAYMENT_REQUEST_BY_ID_ERROR" =
  "LOAD_PAYMENT_REQUEST_BY_ID_ERROR";

export const APPLY_PAYMENT_REQUEST_ACTION_INIT: "APPLY_PAYMENT_REQUEST_ACTION_INIT" =
  "APPLY_PAYMENT_REQUEST_ACTION_INIT"; // eslint-disable-line
export const APPLY_PAYMENT_REQUEST_ACTION_SUCCESS: "APPLY_PAYMENT_REQUEST_ACTION_SUCCESS" =
  "APPLY_PAYMENT_REQUEST_ACTION_SUCCESS"; // eslint-disable-line
export const APPLY_PAYMENT_REQUEST_ACTION_ERROR: "APPLY_PAYMENT_REQUEST_ACTION_ERROR" =
  "APPLY_PAYMENT_REQUEST_ACTION_ERROR"; // eslint-disable-line

export const LOAD_PAYMENT_REMINDER_STATUSES_INIT: "LOAD_PAYMENT_REMINDER_STATUSES_INIT" =
  "LOAD_PAYMENT_REMINDER_STATUSES_INIT"; // eslint-disable-line
export const LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS: "LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS" =
  "LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS"; // eslint-disable-line
export const LOAD_PAYMENT_REMINDER_STATUSES_ERROR: "LOAD_PAYMENT_REMINDER_STATUSES_ERROR" =
  "LOAD_PAYMENT_REMINDER_STATUSES_ERROR"; // eslint-disable-line

export type CreatePaymentRequestInitAction = {|
  type: typeof CREATE_PAYMENT_REQUEST_INIT,
  payload: PaymentRequestTableData
|};
export type CreatePaymentRequestSuccessAction = {|
  type: typeof CREATE_PAYMENT_REQUEST_SUCCESS
|};
export type CreatePaymentRequestErrorAction = {|
  type: typeof CREATE_PAYMENT_REQUEST_ERROR,
  payload: any
|};
export type CreatePaymentRequestSetDefaultPropsAction = {|
  type: typeof CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS
|};

export type LoadPaymentRequestsInitAction = {|
  type: typeof LOAD_PAYMENT_REQUESTS_INIT,
  payload: CollectionParams
|};
export type LoadPaymentRequestsSuccessAction = {|
  type: typeof LOAD_PAYMENT_REQUESTS_SUCCESS,
  payload: { response: PagedResponse<PaymentRequestTableData>, append: boolean }
|};
export type LoadPaymentRequestsErrorAction = {|
  type: typeof LOAD_PAYMENT_REQUESTS_ERROR,
  payload: any
|};

export type EditPaymentRequestInitAction = {|
  type: typeof EDIT_PAYMENT_REQUEST_INIT,
  payload: any
|};
export type EditPaymentRequestSuccessAction = {|
  type: typeof EDIT_PAYMENT_REQUEST_SUCCESS,
  payload: any
|};
export type EditPaymentRequestErrorAction = {|
  type: typeof EDIT_PAYMENT_REQUEST_ERROR,
  payload: any
|};

export type LoadPaymentRemindersInitAction = {|
  type: typeof LOAD_PAYMENT_REMINDERS_INIT,
  payload: any
|};
export type LoadPaymentRemindersSuccessAction = {|
  type: typeof LOAD_PAYMENT_REMINDERS_SUCCESS,
  payload: any
|};
export type LoadPaymentRemindersErrorAction = {|
  type: typeof LOAD_PAYMENT_REMINDERS_ERROR,
  payload: any
|};

export type EditPaymentRemindersInitAction = {|
  type: typeof EDIT_PAYMENT_REMINDERS_INIT,
  payload: any
|};
export type EditPaymentRemindersSuccessAction = {|
  type: typeof EDIT_PAYMENT_REMINDERS_SUCCESS,
  payload: any
|};
export type EditPaymentRemindersErrorAction = {|
  type: typeof EDIT_PAYMENT_REMINDERS_ERROR,
  payload: any
|};

// export type UpdatePaymentRemindersInitAction = {|
//   type: typeof LOAD_PAYMENT_REMINDERS_SUCCESS,
// |};

export type LoadCustomerPaymentRequestInitAction = {|
  type: typeof LOAD_CUSTOMER_PAYMENT_REQUEST_INIT,
  payload: any
|};
export type LoadCustomerPaymentRequestSuccessAction = {|
  type: typeof LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS,
  payload: CustomerPaymentRequest
|};
export type LoadCustomerPaymentRequestErrorAction = {|
  type: typeof LOAD_CUSTOMER_PAYMENT_REQUEST_ERROR,
  payload: any
|};

export type LoadPaymentRequestByIdInitAction = {|
  type: typeof LOAD_PAYMENT_REQUEST_BY_ID_INIT,
  payload: number
|};
export type LoadPaymentRequestByIdSuccessAction = {|
  type: typeof LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS,
  payload: PaymentRequestTableData
|};

export type LoadPaymentRequestByIdErrorAction = {|
  type: typeof LOAD_PAYMENT_REQUEST_BY_ID_ERROR,
  payload: any
|};
export type ApplyPaymentRequestActionInitAction = {|
  type: typeof APPLY_PAYMENT_REQUEST_ACTION_INIT,
  payload: PaymentRequestActionType
|};
export type ApplyPaymentRequestActionSuccessAction = {|
  type: typeof APPLY_PAYMENT_REQUEST_ACTION_SUCCESS
|};
export type ApplyPaymentRequestActionErrorAction = {|
  type: typeof APPLY_PAYMENT_REQUEST_ACTION_ERROR,
  payload: any
|};

export type LoadPaymentReminderStatusesInitAction = {|
  type: typeof LOAD_PAYMENT_REMINDER_STATUSES_INIT
|};
export type LoadPaymentReminderStatusesSuccessAction = {|
  type: typeof LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS,
  payload: any
|};
export type LoadPaymentReminderStatusesError = {|
  type: typeof LOAD_PAYMENT_REMINDER_STATUSES_ERROR,
  payload: any
|};

export type PaymentRequestAction =
  | CreatePaymentRequestInitAction
  | CreatePaymentRequestSuccessAction
  | CreatePaymentRequestErrorAction
  | CreatePaymentRequestSetDefaultPropsAction
  | LoadPaymentRequestsInitAction
  | LoadPaymentRequestsSuccessAction
  | LoadPaymentRequestsErrorAction
  | EditPaymentRequestInitAction
  | EditPaymentRequestSuccessAction
  | EditPaymentRequestErrorAction
  | LoadPaymentRemindersInitAction
  | LoadPaymentRemindersSuccessAction
  | LoadPaymentRemindersErrorAction
  | LoadPaymentRequestByIdInitAction
  | LoadPaymentRequestByIdSuccessAction
  | LoadPaymentRequestByIdErrorAction
  | EditPaymentRemindersSuccessAction
  | EditPaymentRemindersInitAction
  | EditPaymentRemindersErrorAction
  | ApplyPaymentRequestActionInitAction
  | ApplyPaymentRequestActionSuccessAction
  | ApplyPaymentRequestActionErrorAction
  | LoadCustomerPaymentRequestInitAction
  | LoadCustomerPaymentRequestSuccessAction
  | LoadCustomerPaymentRequestErrorAction
  | LoadPaymentReminderStatusesInitAction
  | LoadPaymentReminderStatusesSuccessAction
  | LoadPaymentReminderStatusesError;
