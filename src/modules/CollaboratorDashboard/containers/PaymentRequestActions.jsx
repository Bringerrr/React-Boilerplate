// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Loadable } from 'components';
import type {
  PaymentRequestState,
  PaymentRequestStatusType,
  PaymentRequestActionType,
} from 'state/payment-request/payment-request.types';
import { applyPaymentRequestActionInit } from 'state/payment-request/payment-request.actions';

type PaymentRequestActionsStateProps = {|
  isLoading: boolean,
  status: PaymentRequestStatusType,
  applyPaymentRequestActionInit: (type: string) => void,
|};

type PaymentRequestActionsActionProps = {|
  applyPaymentRequestActionInit: (type: PaymentRequestActionType) => any,
|};

type PaymentRequestActionsProps = PaymentRequestActionsStateProps & PaymentRequestActionsActionProps;

const PaymentRequestActions = (props: PaymentRequestActionsProps) => {
  const { isLoading, status, applyPaymentRequestActionInit } = props;
  return (
    <Loadable isLoading={isLoading}>
      <div className="PaymentRequestsInfo_ButtonContainer">
        {status === 'CREATED' ? (
          <Button
            className="ButtonContainer_Button Active-Button"
            onClick={() => applyPaymentRequestActionInit('APPROVE')}
          >
            Mark approved
          </Button>
        ) : (
          <Button className="ButtonContainer_Button" disabled>
            Approved
          </Button>
        )}
        <Button
          className="ButtonContainer_Button Simple-Button"
          onClick={() => applyPaymentRequestActionInit('REPORT')}
        >
          Report
        </Button>
      </div>
    </Loadable>
  );
};

export default connect(
  (state: { paymentRequest: PaymentRequestState }): PaymentRequestActionsStateProps => ({
    isLoading: state.paymentRequest.loadings.actions,
    status: !state.paymentRequest.current ? 'CREATED' : state.paymentRequest.current.status,
  }),
  ({ applyPaymentRequestActionInit }: PaymentRequestActionsActionProps),
)(PaymentRequestActions);
