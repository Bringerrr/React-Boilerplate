// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createLoanInit, createLoanSetDefaultProps } from 'state/loan/loan.actions';
import { MasterDetailTable, PaymentRequestTable, PaymentRequestInfoPanel } from 'containers';
import { CreateLoanModal } from './components';

import './CollaboratorDashboard.scss';

type CollaboratorDashboardProps = {
  id?: ?number,
  pagination: {
    total: number,
    count?: number,
    pageSize: number,
  },
  isLoading: ?boolean,
  isCreated: boolean,
  error: null | Array<string>,
  createLoanInit: typeof createLoanInit,
  createLoanSetDefaultProps: typeof createLoanSetDefaultProps,
  users: Array<Object>,
};

const CollaboratorDashboard = ({
  pagination,
  id,
  isLoading,
  isCreated,
  error,
  users,

  createLoanInit,
  createLoanSetDefaultProps,
}: CollaboratorDashboardProps) => {
  useEffect(() => {
    document.title = 'Requests Dashboard';
  }, []);

  const table = <PaymentRequestTable open="collaborator-dashboard" />;

  const button = (
    <CreateLoanModal
      onCreate={createLoanInit}
      isLoading={isLoading}
      isCreated={isCreated}
      error={error}
      setDefaultProps={createLoanSetDefaultProps}
      users={users}
    />
  );

  const detail = <PaymentRequestInfoPanel id={id} />;

  return (
    <div className="PaymentRequests-Container">
      <MasterDetailTable
        title="Requests Dashboard"
        Detail={detail}
        Button={button}
        total={pagination.total}
        id={id}
        Table={table}
      />
    </div>
  );
};

CollaboratorDashboard.defaultProps = {
  id: null,
};

export default connect(
  (state, props) => ({
    pagination: state.paymentRequest.pagination,
    isLoading: state.loan.isLoading,
    isCreated: state.loan.isCreated,
    users: state.user.users,
    error: state.loan.error,
    id: props.match.params.id ? Number(props.match.params.id) : null,
  }),
  {
    createLoanInit,
    createLoanSetDefaultProps,
  },
)(CollaboratorDashboard);
