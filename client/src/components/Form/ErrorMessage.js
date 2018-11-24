import React from 'react';
import { Message } from 'semantic-ui-react';

// single message of all field and submission errors
const ErrorMessage = (props) => {
  const {
    errors,
    touched,
    status,
    schema,
  } = props;
  const list = [];
  // go through each field in schema and check if should display error
  Object.keys(schema).forEach((field) => {
    if (errors[field] && touched[field]) {
      list.push(errors[field]);
    }
  });
  // has submission error
  if (status && status === 'submissionError') {
    list.push('Failed to Submit');
  }

  const messageProps = {
    list,
    error: true,
    header: 'There was some errors with your submission',
    'data-cy': 'message-error',
  };

  return list.length ? <Message {...messageProps} /> : null;
};

export default ErrorMessage;
