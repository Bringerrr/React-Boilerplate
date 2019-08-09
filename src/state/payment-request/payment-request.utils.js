// @flow
import type { PaymentRequestTableData } from './payment-request.types';

export const parseDate = (value: string | number | Date): Date => (value != null ? new Date(value) : new Date());

const printDateCore: (number | string) => string = value =>
  (typeof value === 'string' ? value : new Date(value).toDateString());

export const printDate = (value: string | number | Date): string =>
  (value instanceof Date ? value.toDateString() : printDateCore(value));

export const processCollectionResponse = (elements: Array<PaymentRequestTableData>): Array<PaymentRequestTableData> =>
  elements.map(element => ({
    ...element,
    creationDate: parseDate(element.creationDate),
    signatureDate: parseDate(element.signatureDate),
  }));
