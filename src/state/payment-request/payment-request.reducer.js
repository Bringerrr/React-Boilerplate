// @flow

import changeCase from 'change-case';
import type { PaymentRequestAction, PaymentRequestState } from './payment-request.types';
import {
  APPLY_PAYMENT_REQUEST_ACTION_ERROR,
  APPLY_PAYMENT_REQUEST_ACTION_INIT,
  APPLY_PAYMENT_REQUEST_ACTION_SUCCESS,
  CREATE_PAYMENT_REQUEST_ERROR,
  CREATE_PAYMENT_REQUEST_INIT,
  CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS,
  CREATE_PAYMENT_REQUEST_SUCCESS,
  EDIT_PAYMENT_REQUEST_INIT,
  EDIT_PAYMENT_REQUEST_SUCCESS,
  EDIT_PAYMENT_REQUEST_ERROR,
  LOAD_PAYMENT_REQUEST_BY_ID_ERROR,
  LOAD_PAYMENT_REQUEST_BY_ID_INIT,
  LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS,
  LOAD_PAYMENT_REQUESTS_ERROR,
  LOAD_PAYMENT_REQUESTS_INIT,
  LOAD_PAYMENT_REQUESTS_SUCCESS,
  LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS,
  LOAD_PAYMENT_REMINDERS_SUCCESS,
  EDIT_PAYMENT_REMINDERS_SUCCESS,
  LOAD_PAYMENT_REMINDER_STATUSES_INIT,
  LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS,
  LOAD_PAYMENT_REMINDER_STATUSES_ERROR,
  PaymentRemindersDashboardStatuses,
} from './payment-request.types';
import { processCollectionResponse } from './payment-request.utils';

const defaultReminders = Object.fromEntries(
  Object.entries(PaymentRemindersDashboardStatuses).map(([, value]) => [changeCase.camelCase(value), []]),
);

const initState: PaymentRequestState = {
  elements: [],
  tableSort: {
    column: 'id',
    direction: 'ASC',
  },
  pagination: {
    total: 0,
    pageSize: 10,
  },
  current: null,
  loadings: {
    table: false,
    info: false,
    actions: false,
    creation: false,
    statuses: false,
  },
  customerPaymentRequest: null,
  customerPaymentReminders: {
    statusReminders: defaultReminders,
    maxPage: 1,
  },
  remindersStatuses: {},
  isCreated: false,
  error: null,
};

export default (state: PaymentRequestState = initState, action: PaymentRequestAction): PaymentRequestState => {
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST_INIT:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          creation: true,
        },
        isCreated: false,
      };
    case CREATE_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          creation: false,
        },
        isCreated: true,
      };
    case CREATE_PAYMENT_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        loadings: {
          ...state.loadings,
          creation: false,
        },
        isCreated: false,
      };
    case EDIT_PAYMENT_REQUEST_INIT:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          editing: true,
        },
      };
    case EDIT_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          editing: false,
        },
      };
    case EDIT_PAYMENT_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        loadings: {
          ...state.loadings,
          editing: false,
        },
      };
    case LOAD_CUSTOMER_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        customerPaymentRequest: action.payload,
      };
    case CREATE_PAYMENT_REQUEST_SET_DEFAULT_RPOPS:
      return {
        ...state,
        isCreated: false,
        error: null,
      };
    case LOAD_PAYMENT_REQUESTS_INIT: {
      const { sort, direction } = action.payload;
      return {
        ...state,
        tableSort: {
          ...state.tableSort,
          column: sort,
          direction,
        },
        loadings: {
          ...state.loadings,
          table: true,
        },
      };
    }
    case LOAD_PAYMENT_REQUESTS_SUCCESS: {
      const { total, elements } = action.payload.response;
      const { append } = action.payload;
      const newElements = append
        ? [...state.elements, ...processCollectionResponse(elements)]
        : processCollectionResponse(elements);
      return {
        ...state,
        elements: newElements,
        pagination: {
          total,
          pageSize: state.pagination.pageSize,
        },
        loadings: {
          ...state.loadings,
          table: false,
        },
      };
    }
    case LOAD_PAYMENT_REMINDERS_SUCCESS: {
      const { statusReminders } = action.payload;

      // const newStatusReminders = { ...defaultReminders };

      return {
        ...state,
        customerPaymentReminders: {
          ...state.customerPaymentReminders,
          statusReminders: {
            ...defaultReminders,
            ...statusReminders,
          },
        },
      };
    }
    case EDIT_PAYMENT_REMINDERS_SUCCESS: {
      return {
        ...state,
      };
    }
    case LOAD_PAYMENT_REQUESTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loadings: {
          ...state.loadings,
          table: false,
        },
      };
    case LOAD_PAYMENT_REQUEST_BY_ID_INIT:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          info: true,
          actions: true,
        },
      };
    case LOAD_PAYMENT_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loadings: {
          ...state.loadings,
          info: false,
          actions: false,
        },
      };
    case LOAD_PAYMENT_REQUEST_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload,
        loadings: {
          ...state.loadings,
          info: false,
          actions: false,
        },
      };
    case APPLY_PAYMENT_REQUEST_ACTION_INIT:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          action: true,
        },
      };
    case APPLY_PAYMENT_REQUEST_ACTION_SUCCESS:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          action: false,
        },
      };
    case APPLY_PAYMENT_REQUEST_ACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loadings: {
          ...state.loadings,
          action: false,
        },
      };
    case LOAD_PAYMENT_REMINDER_STATUSES_INIT:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          statuses: true,
        },
      };
    case LOAD_PAYMENT_REMINDER_STATUSES_SUCCESS:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          statuses: true,
        },
      };
    case LOAD_PAYMENT_REMINDER_STATUSES_ERROR:
      return {
        ...state,
        remindersStatuses: action.payload,
        loadings: {
          ...state.loadings,
          statuses: true,
        },
      };
    default:
      return state;
  }
};
