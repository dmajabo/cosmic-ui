/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';

export default function NotFound() {
  return (
    <article>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      {/* <FacebookLogin
        appId="186319140157433"
        fields="name,email,picture"
        callback={responseFacebook}
      /> */}
      <br />
      <br />

      {/* <GoogleLogin
        clientId="" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}
    </article>
  );
}
