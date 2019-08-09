// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Gravatar from 'react-gravatar';
import { Loadable } from 'components';
import { MailIcon, Reject } from 'assets/icons';
import { moneyFormat } from 'helper';

import { Currency } from 'state/types';
import { loadPaymentRequestByIdInit } from 'state/payment-request/payment-request.actions';
import type { PaymentRequestInfo } from 'state/payment-request/payment-request.types';

import './PaymentRequestInfo.scss';
import PaymentRequestActions from './PaymentRequestActions';

export type PaymentRequestInfoPanelProps = {
  id: number,
  paymentRequest?: ?PaymentRequestInfo,
  isLoading: boolean,

  loadPaymentRequestByIdInit: typeof loadPaymentRequestByIdInit,
};

const PaymentRequestInfoPanel = (props: PaymentRequestInfoPanelProps) => {
  const {
    id,
    paymentRequest,
    isLoading,

    loadPaymentRequestByIdInit,
  } = props;

  const {
    notaryEmail,
    notaryPhoneNumber,
    notaryFirstName,
    notaryLastName,
    paymentInteractions,
    paymentAmount: amount,
    currency,
  } = paymentRequest || {
    notaryEmail: '',
    notaryPhoneNumber: '',
    notaryFirstName: '',
    notaryLastName: '',
    paymentInteractions: [],
    currency: Currency.EUR,
    paymentAmount: 0,
  };

  useEffect(() => {
    loadPaymentRequestByIdInit(id);
  }, [id]);

  const icons = {
    LOAN_CREATED: <MailIcon />,
    PAYMENT_CREATED: <Reject />,
    PAYMENT_READY_FOR_SIGNING: <MailIcon />,
    PAYMENT_NOT_COMPLETE: <MailIcon />,
    PAYMENT_VALIDATED: <Reject />,
    PAYMENT_REJECTED: <MailIcon />,
    PAYMENT_CONFIRMED: <MailIcon />,
    PAYMENT_TERMINATED: <MailIcon />,
  };

  return (
    <div className="PaymentRequestsInfo-Container">
      <Loadable isLoading={isLoading}>
        <PaymentRequestActions />
        <div className="UserInfo_Block PaymentRequestsInfo_UserInfo">
          <h4 className="UserInfo_Header">Client Info</h4>
          <div className="UserInfo_Top">
            <div className="Top_Avatar">
              <Gravatar email="mathews.kyle@gmail.com" size={45} />
            </div>
            <div className="UserInfo-Top_LeftBlock">
              <h5 className="Top_UserName">{`${notaryFirstName || ''} ${notaryLastName || ''}`}</h5>
              <span className="Top_Interactions">{`${paymentInteractions.length} interactions`}</span>
            </div>
          </div>
          <div className="UserInfo_Bottom">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident tempora saepe praesentium
            nobis.
          </div>
        </div>
        <div className="UserInfo_Block UserInfo_Interactions">
          <Loadable isLoading={isLoading}>
            <ul className="UserInfo_Header Interactions_List">
              interactions timeline
              {paymentInteractions.map(interaction => (
                <li key={interaction.id} className="Intaraction_Item">
                  <div className="Item_Image MailIcon">
                    {/* <MailIcon /> */}
                    {icons[interaction.type]}
                  </div>
                  <span className="Intaraction_Text">{interaction.message}</span>
                </li>
              ))}
            </ul>
          </Loadable>
        </div>
        <div className="UserInfo_Block UserInfo_Email">
          <h4 className="UserInfo_Header">Email</h4>
          <span className="UserInfo_Text">{notaryEmail}</span>
        </div>
        <div className="UserInfo_Block UserInfo_Phone">
          <h4 className="UserInfo_Header">Phone</h4>
          <span className="UserInfo_Text">{notaryPhoneNumber}</span>
        </div>
        <div className="UserInfo_Block UserInfo_">
          <h4 className="UserInfo_Header">Payment Amount</h4>
          <span className="UserInfo_Text">{moneyFormat(amount, currency)}</span>
        </div>
      </Loadable>
    </div>
  );
};

PaymentRequestInfoPanel.defaultProps = {
  paymentRequest: null,
};

export default connect(
  state => ({
    isLoading: state.paymentRequest.loadings.actions,
    paymentRequest: state.paymentRequest.current,
  }),
  {
    loadPaymentRequestByIdInit,
  },
)(PaymentRequestInfoPanel);
