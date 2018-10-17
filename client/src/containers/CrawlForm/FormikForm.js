import React from 'react';
import {
  Dimmer,
  Loader,
  Button,
  Form,
} from 'semantic-ui-react';

import schema from './schema';
import withFormik from './withFormik';

import Field from '../../components/Form/Field';
import ErrorMessage from '../../components/Form/ErrorMessage';

/**
 * Form to wrap with formik HOC
 */
class FormikForm extends React.PureComponent {
  renderFields = () => (
    Object.keys(schema).map(field => (
      <Field key={field} formikProps={this.props} field={schema[field]} />
    ))
  )

  render() {
    const {
      handleSubmit,
      isSubmitting,
    } = this.props;

    const submitProps = {
      fluid: true,
      icon: 'send',
      size: 'large',
      type: 'submit',
      color: 'violet',
      content: 'Send',
      disabled: isSubmitting,
    };

    return (
      <div>
        <Dimmer active={isSubmitting} inverted>
          <Loader>Crawling the interwebs...</Loader>
        </Dimmer>

        <Form size={'large'} onSubmit={handleSubmit}>
          {this.renderFields()}
          <Button {...submitProps} />
        </Form>

        <ErrorMessage schema={schema} {...this.props} />
      </div>
    );
  }
}

export default withFormik(FormikForm);
