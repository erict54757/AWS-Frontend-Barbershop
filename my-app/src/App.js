import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';

import "./App.css";

import Auth from "./utils/auth";

import {Customer} from "./pages/Customer";
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";

export class App extends React.Component {
  state = {
    token: Auth.getToken(),
    name: Auth.getName(),
    id: Auth.getId(),
    isEmp: Auth.getIsEmp(),
    isCust: Auth.getIsCust()
  };

  componentDidMount() {
    Auth.onAuthChange(this.handleAuthChange);
  }

  handleAuthChange = token => {
    this.setState({ token });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <Customer />} />
            <PrivateRoute
              exact
              path="/employee"
              component={Employee}
              token={this.state.token}
            />
            <PrivateRoute
              exact
              path="/admin"
              component={Admin}
              token={this.state.token}
            />
            <PrivateRoute
              exact
              path="/customer"
              component={Customer}
              token={this.state.token}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({
  component: Component,
  token,

  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} token={token} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// export default App;
