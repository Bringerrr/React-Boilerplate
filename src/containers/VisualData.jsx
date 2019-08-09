// @flow

import React, { useState } from "react";
import changeCase from "change-case";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Segment, Form } from "semantic-ui-react";
// import type { UserRole } from "state/auth/auth.types";
import {
  addDocument,
  addBank,
  addMoneyTransfer,
  addLoan,
  addPaymentRequest,
  addUser,
  assignRole,
  addBankAccount
} from "assets/entities";
import "./VisualData.scss";

import { onChange } from "helper";

type VisualDataProps = {
  // showMessage: ?boolean,
};

const { Select } = Form;

const recursion = doc => {
  const nestedListItem = val => {
    if (typeof val !== "object") {
      return <div>{val}</div>;
    } else return <List.List>{recursion(val)}</List.List>;
  };
  return Object.entries(doc).map(([key, value]) => {
    if (key[0] === "@" && key !== "@id" && key !== "@type") {
      return null;
    } else
      return (
        <List.Item>
          <List.Icon name="minus" />
          <List.Content>
            <List.Header>
              {changeCase.sentenceCase(key)} {" : "}
            </List.Header>
            <List.Description
              className={typeof value !== "object" ? "row" : "nested"}
            >
              {nestedListItem(value)}
            </List.Description>
          </List.Content>
        </List.Item>
      );
  });
};

const VisualData = () => {
  const entities = {
    addDocument,
    addBank,
    addMoneyTransfer,
    addLoan,
    addPaymentRequest,
    addUser,
    assignRole,
    addBankAccount
  };
  const optionsEntity = Object.entries(entities).map(([key, value]) => {
    return {
      key,
      value: key,
      text: key
    };
  });

  const [entity, setEntity] = useState(optionsEntity[0].value);

  return (
    <div className="VisualData">
      <Select
        type="text"
        label="Entity"
        placeholder="Entity"
        className="EntitySelector"
        value={entity}
        onChange={onChange(setEntity)}
        options={optionsEntity}
      />
      <Segment className="VisualData_Container">
        <List className="VisualData__List">{recursion(entities[entity])}</List>
      </Segment>
    </div>
  );
};

export default withRouter(
  connect(
    state => ({}),
    {}
  )(VisualData)
);
