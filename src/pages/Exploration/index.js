import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet-async';

export default function index() {
  return (
    <Fragment>
      <Helmet>
        <title>Explorations</title>
        <meta
          name="description"
          content="Portfolio of Harum Shidiqi – a digital designer working on web &amp; mobile
          apps with a focus on motion and user experience design."
        />
      </Helmet>
      <h1>EXPLORATIONS</h1>
    </Fragment>
  );
}
