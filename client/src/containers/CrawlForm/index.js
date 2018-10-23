import React from 'react';
import { withRouter } from 'react-router-dom';

import FormikForm from './FormikForm';

import * as historyStorage from '../../utils/historyStorage';

/**
 * Wrapper around actual form for crawler, as formik
 * requires methods are passed as props
 */
class CrawlForm extends React.PureComponent {
  state = {
    id: null,
  }

  onRequest = ({ request }) => {
    const id = historyStorage.newItem();
    this.setState({ id });
    historyStorage.updateItem({ id, request });
  };

  onSuccess = ({ response }) => {
    const { history, updateData } = this.props;
    const { id } = this.state;
    updateData({ data: response });
    historyStorage.updateItem({ id, response });
    history.push('/graph');
  }

  onFailure = ({ error }) => {
    const { id } = this.state;
    historyStorage.updateItem({ id, error });
  }

  render() {
    const formProps = {
      onRequest: this.onRequest,
      onSuccess: this.onSuccess,
      onFailure: this.onFailure,
    };

    return (
      <FormikForm {...formProps} />
    );
  }
}

export default withRouter(CrawlForm);
