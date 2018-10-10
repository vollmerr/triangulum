import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import schema from './schema';
import withFormik from './withFormik';

import Field from '../../components/Form/Field';
import ErrorMessage from '../../components/Form/ErrorMessage';

// form for sending to crawler
class CrawlerForm extends React.PureComponent {
  renderFields = () => (
    Object.keys(schema).map(field => (
      <Field key={field} formikProps={this.props} field={schema[field]} />
    ))
  )

  render() {
    const {
      handleSubmit,
      // handleReset,
      // isSubmitting,
    } = this.props;

    const submitProps = {
      fluid: true,
      icon: 'send',
      size: 'large',
      type: 'submit',
      color: 'violet',
      content: 'send',
    };

    const errorProps = {
      schema,
      ...this.props,
    };

    return (
      <div>
        <Form size='large' onSubmit={handleSubmit}>
          {
            this.renderFields()
          }
          <Button {...submitProps} />
        </Form>

        <ErrorMessage {...errorProps} />
      </div>
    );
  }
}

export default withFormik(CrawlerForm);
