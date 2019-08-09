// @flow

import { http } from "helper";
import changeCase from "change-case";
import type { CollectionParams, PagedResponse } from "../types";
import type {
  PaymentRequestTableData,
  PaymentRequestInfo
} from "./payment-request.types";

const { get, post, put } = http;

export const loadPaymentRequests = (
  collectionParams: CollectionParams
): Promise<PagedResponse<PaymentRequestTableData>> => {
  const { offset, limit, sort, direction } = collectionParams;
  const params = {
    offset,
    limit,
    sort: `${changeCase.snakeCase(sort)},${String(direction)}`
  };
  return get("/api/payment-requests", params, {
    Accept: "application/x.last-payment-user-filter+json"
  });
};

export const editPaymentRequest = (
  paymentRequest: PaymentRequestInfo
): Promise<PaymentRequestInfo> => {
  const { id } = paymentRequest;
  return put(`/api/payment-requests/${id}`, paymentRequest);
};

type UserRole = any;

export const loadUsersPaymentRequests = (
  userId: number,
  role: UserRole,
  params: CollectionParams
): Promise<PagedResponse<any>> =>
  get(`/api/${role}/${userId}/loans`, params, {
    Accept: "application/x.last-payment-user-filter+json"
  });

export const loadPaymentReminders = (
  page: number
): Promise<PagedResponse<PaymentRequestTableData>> =>
  get(`api/payment-reminders/page/${page}`);

export const editPaymentReminders = (
  id: number,
  status: string
): Promise<PagedResponse<PaymentRequestTableData>> =>
  post(`api/payment-requests/${id}/status/${changeCase.constantCase(status)}`);

export const loadCustomerPaymentRequest = (
  id: number
): Promise<PagedResponse<PaymentRequestTableData>> =>
  get(`api/customers/${id}/closest-payment-request`, null, {
    Accept: "application/x.customer-payment-info+json"
  });

export const createPaymentRequest = (
  paymentRequest: PaymentRequestTableData
): Promise<void> => post("api/payment-requests", paymentRequest);

export const loadPaymentRequestById = (
  id: number
): Promise<PaymentRequestTableData> =>
  get(`api/payment-requests/${id}`, null, {
    Accept: "application/x.payment-request-info+json"
  });

export const approvePaymentRequest = (id: number): Promise<void> =>
  post(`api/payment-requests/${id}/approve`);

export const reportPaymentRequest = (id: number): Promise<void> =>
  post(`api/payment-requests/${id}/report`);
