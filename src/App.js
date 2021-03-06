import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Rooms from "./Rooms";
import ChatWithData from "./ChatWithData";

import AWSAppSyncClient from "aws-appsync";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AppSyncConfig from "./aws-exports";

Amplify.configure(AppSyncConfig);

const client = new AWSAppSyncClient({
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectCredentials: () => Auth.currentCredentials(),
});

const App = () => {
  console.log("rendering app");
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <Router>
          <Switch>
            <Route path="/room/:roomId" component={ChatWithData} />
            <Route path="/" component={Rooms} />
          </Switch>
        </Router>
      </Rehydrated>
    </ApolloProvider>
  );
};
export default withAuthenticator(App);
