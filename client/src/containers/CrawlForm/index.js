import React from 'react';
import { withRouter } from 'react-router-dom';

import * as historyStorage from '../../utils/historyStorage';

import FormikForm from './FormikForm';

/**
 * Wrapper around actual form for crawler, as formik
 * requires methods are passed as props
 */
export class CrawlForm extends React.PureComponent {
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
    historyStorage.updateItem({ id, response });
    const data = historyStorage.getItem({ id });
    updateData({ data });
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
