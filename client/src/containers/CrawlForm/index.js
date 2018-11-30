import React from 'react';
import { withRouter } from 'react-router-dom';

import * as historyStorage from '../../utils/historyStorage';
import ws from '../../utils/socket';

import FormikForm from './FormikForm';

/**
 * Wrapper around actual form for crawler, as formik
 * requires methods are passed as props
 */
export class CrawlForm extends React.PureComponent {
  state = {
    id: null,
  }

  handleSubmit = ({ bag, values }) => {
    bag.setStatus(null);
    if (ws.readyState === ws.OPEN) {
      this.onRequest({ request: values, bag });
      ws.onmessage = response => this.onSuccess({ response, bag });
      ws.onerror = error => this.onFailure({ error, bag });
    } else {
      this.onFailure({ error: 'Web socket closed', bag });
    }
  }

  onRequest = ({ request }) => {
    const id = historyStorage.newItem();
    this.setState({ id });
    historyStorage.updateItem({ id, request });

    if (ws.readyState !== ws.OPEN) {
      ws.init();
    }
    ws.send(JSON.stringify(request));
  };

  onSuccess = ({ response, bag }) => {
    const { history, updateData } = this.props;
    const { id } = this.state;
    bag.setSubmitting(false);
    historyStorage.updateItem({ id, response: JSON.parse(response.data) });
    const data = historyStorage.getItem({ id });
    updateData({ data });
    history.push('/graph');
  }

  onFailure = ({ error, bag }) => {
    const { id } = this.state;
    bag.setStatus('submissionError');
    bag.setSubmitting(false);
    historyStorage.updateItem({ id, error });
  }

  render() {
    const formProps = {
      handleSubmit: this.handleSubmit,
    };

    return (
      <FormikForm {...formProps} />
    );
  }
}

export default withRouter(CrawlForm);
