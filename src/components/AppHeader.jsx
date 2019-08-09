import React from 'react';
import { NavLink } from 'react-router-dom';

import { MailIcon } from 'assets/icons';

import './AppHeader.scss';
import { AppUserDropdown } from '../containers';

const AppHeader = () => (
  <header className="AppHeader">
    <div className="ui container">
      <NavLink to="/" className="AppHeader-Brand">coneix.io</NavLink>
      <div className="AppHeader-Controls">
        <div className="AppHeader-Button">
          <MailIcon className="MailIcon" />
        </div>
        <AppUserDropdown className="AppHeader-Button" />
      </div>
    </div>
  </header>
);

export default AppHeader;
