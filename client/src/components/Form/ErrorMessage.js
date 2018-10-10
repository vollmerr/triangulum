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

  Object.keys(schema).forEach((field) => {
    if (errors[field] && touched[field]) {
      list.push(errors[field]);
    }
  });

  if (status && status === 'submissionError') {
    list.push('Failed to Submit');
  }

  const messageProps = {
    list,
    error: true,
    header: 'There was some errors with your submission',
  };

  return list.length ? <Message {...messageProps} /> : null;
};

export default ErrorMessage;
