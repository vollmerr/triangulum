import React from 'react';
import {
  Container,
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
export class FormikForm extends React.PureComponent {
  renderFields = () => (
    Object.keys(schema).map(field => (
      <Field
        key={field}
        formikProps={this.props}
        field={schema[field]}
        data-cy={`field-${field}`}
      />
    ))
  )

  render() {
    const {
      handleSubmit,
      isSubmitting,
    } = this.props;

    const submitProps = {
      className: 'submitBtn',
      fluid: true,
      icon: 'send',
      type: 'submit',
      color: 'violet',
      content: 'Send',
      disabled: isSubmitting,
      'data-cy': 'button-submit',
    };

    return (
      <Container text className={'page'}>
        <Dimmer active={isSubmitting} inverted>
          <Loader data-cy='loader'>Crawling the interwebs...</Loader>
        </Dimmer>

        <Form onSubmit={handleSubmit}>
          {this.renderFields()}
          <ErrorMessage schema={schema} {...this.props} />

          <Button {...submitProps} />
        </Form>
      </Container>
    );
  }
}

export default withFormik(FormikForm);
