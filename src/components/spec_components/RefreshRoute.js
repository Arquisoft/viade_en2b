import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RefreshRoute = ({ component: Component, isDataAvailable, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isDataAvailable ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isDataAvailable:
    window.performance && window.performance.navigation.type == 1,
});

export default RefreshRoute;
