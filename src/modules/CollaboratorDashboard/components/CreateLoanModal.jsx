// @flow

import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Currency, type CollectionParams } from 'state/types';
import { Checked, Reject } from 'assets/icons';
import type { Loan } from 'state/loan/loan.types';
import type { User } from 'state/user/user.types';

import { onChangeNumbersOnly } from 'helper';

import { loadUsersFilteredByRoleInit } from 'state/user/user.actions';

const {
  Dropdown, Input, Group, Select,
} = Form;

const currencyOptions = Object.entries(Currency).map(([key, value]) => ({
  key,
  value: key,
  text: value,
}));

const loadUsersParams: CollectionParams = {
  offset: 0,
  limit: 20,
  sort: 'name',
  direction: 'ASC',
  append: false,
};

type CreateLoanModalProps = {|
  onCreate: ({|
    currency: typeof Currency | string,
    amount: number | string,
    customerId: number | string,
    notaryId: number | string,
    contactNumber: string,
  |}) => Loan,
  isLoading: ?boolean,
  isCreated: boolean,
  error: ?{ response: { data: { message: string } } },
  customers: Array<User>,
  notaries: Array<User>,
  loadUsersFilteredByRoleInit: typeof loadUsersFilteredByRoleInit,
  setDefaultProps: () => void,
|};

const CreateLoanModal = (props: CreateLoanModalProps) => {
  const {
    onCreate,
    isLoading,
    isCreated,
    error,
    customers,
    notaries,

    loadUsersFilteredByRoleInit,
    setDefaultProps,
  } = props;

  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState(Currency.EUR);
  const [amount, setAmount] = useState('');
  const [contact, setContact] = useState('');
  const [customer, setCustomer] = useState({ searchQuery: '', value: '', id: '' });
  const [notary, setNotary] = useState({ searchQuery: '', value: '', id: '' });

  const reset = () => {
    setCurrency(Currency.EUR);
    setAmount('');
    setContact('');
    setCustomer({ searchQuery: '', value: '', id: '' });
    setNotary({ searchQuery: '', value: '', id: '' });
  };

  useEffect(() => {
    setDefaultProps();
    if (open === true) {
      reset();
      loadUsersFilteredByRoleInit(loadUsersParams, 'CUSTOMER');
      loadUsersFilteredByRoleInit(loadUsersParams, 'NOTARY');
    }
  }, [open]);

  const handleSaveClick = () => {
    onCreate({
      currency,
      amount,
      customerId: customer.id,
      notaryId: notary.id,
      contactNumber: contact,
    });
  };

  const customerHandleChange = (e, { searchQuery, value }) => {
    setCustomer(() => ({
      ...customer,
      searchQuery,
      value,
      id: e.currentTarget.id,
    }));
  };

  const customerHandleSearchChange = (e, { searchQuery }) => {
    setCustomer(() => ({ ...customer, searchQuery }));
  };

  const notaryHandleChange = (e, { searchQuery, value }) => {
    setNotary(() => ({
      ...notary,
      searchQuery,
      value,
      id: e.currentTarget.id,
    }));
  };

  const notaryHandleSearchChange = (e, { searchQuery }) => {
    setNotary(() => ({ ...notary, searchQuery }));
  };

  const createOptions = arrayOfUsers =>
    arrayOfUsers.map(user => ({
      key: user.id,
      value: user.username,
      text: user.username,
      id: user.id,
    }));

  return (
    <Modal
      trigger={(
        <Button primary onClick={() => setOpen(true)}>
          Create Loan
        </Button>
)}
      centered={false}
      open={open}
      size="tiny"
    >
      <Modal.Header>Create Loan</Modal.Header>
      <Modal.Content className="Modal_Container">
        {isCreated && (
          <div className="Success">
            <Checked />
            Loan created
          </div>
        )}
        {!isCreated && error && (
          <div className="Reject">
            <Reject />
            {error.response.data.message}
          </div>
        )}
        {!isCreated && !error && (
          <Form>
            <Group>
              <Input
                width={12}
                label="Amount"
                value={amount}
                autoComplete="off"
                onChange={({ target }) => onChangeNumbersOnly(target.value, setAmount)}
                placeholder="Amount"
              />
              <Select
                fluid
                width={4}
                label="Currency"
                value={currency}
                options={currencyOptions}
                onChange={(e, { value }) => setCurrency(value)}
                placeholder="Currency"
              />
            </Group>
            <Dropdown
              fluid
              onChange={customerHandleChange}
              onSearchChange={customerHandleSearchChange}
              options={createOptions(customers)}
              label="Customer"
              placeholder="Customer"
              search
              searchQuery={customer.searchQuery}
              selection
              value={customer.value}
            />
            <Dropdown
              fluid
              onChange={notaryHandleChange}
              onSearchChange={notaryHandleSearchChange}
              options={createOptions(notaries)}
              label="Notary"
              placeholder="Notary"
              search
              searchQuery={notary.searchQuery}
              selection
              value={notary.value}
            />
            <Input
              fluid
              id="loan-create-contact"
              label="Contact Info"
              width={16}
              value={contact}
              onChange={({ target }) => setContact(target.value)}
              placeholder="Contact"
            />
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        {!error && !isCreated && (
          <Button primary loading={isLoading} onClick={handleSaveClick}>
            Create
          </Button>
        )}
        <Button secondary onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect(
  state => ({
    notaries: state.user.usersFilteredByRoles.notaries.elements,
    customers: state.user.usersFilteredByRoles.customers.elements,
  }),
  {
    loadUsersFilteredByRoleInit,
  },
)(CreateLoanModal);
