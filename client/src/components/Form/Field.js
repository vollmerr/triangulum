import React from 'react';
import { Form } from 'semantic-ui-react';

// maps formik props to semantic-ui field
const Field = ({ formikProps, field, ...rest }) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = formikProps;
  const { name, options } = field;

  const props = {
    ...field,
    value: values[name],
    disabled: isSubmitting,
    onChange: handleChange,
    onBlur: handleBlur,
    error: !!errors[name] && touched[name],
    ...rest,
  };

  // handle fields with multiple values (select, etc)
  if (options) {
    props.options = options.map(option => ({
      name,
      key: option.value,
      ...option,
    }));
    props.onChange = (e, x) => setFieldValue(name, x.value);
    props.onBlur = () => setFieldTouched(name, true);
  }

  return (
    <Form.Field {...props} />
  );
};

export default Field;
