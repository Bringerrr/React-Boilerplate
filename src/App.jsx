// @flow

import React from "react";
import "normalize.css";
import { VisualData } from "./containers";
import { resolveLinks } from "./helper";
import type { UserRole } from "./state/types";
import "./App.scss";

type AppProps = {
  userRole: ?UserRole
};

const App = ({ userRole }: AppProps) => {
  return (
    <div className="App">
      <VisualData />
    </div>
  );
};

export default App;
