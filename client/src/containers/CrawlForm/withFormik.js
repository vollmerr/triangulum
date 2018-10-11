import { withFormik } from 'formik';
import * as yup from 'yup';

// validation to perform on fields of form
export const validationSchema = yup.object().shape({
  url: yup.string().required('Starting URL is Required'),
  type: yup.string().required('Search Type is Required'),
  limit: yup.number().required('Limit is Required'),
  keyword: yup.string(),
});

// maps which values are present in form
export const mapPropsToValues = () => ({
  url: '',
  type: '',
  limit: '',
  keyword: '',
});

// handles submitting the form, updates data in parent container
export const handleSubmit = async (values, bag) => {
  const url = `${process.env.REACT_APP_URL}/api/crawl`;
  const options = {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    bag.setStatus(null);
    const res = await fetch(url, options);
    const json = await res.json();
    bag.props.onSuccess(json);
  } catch (err) {
    bag.setStatus('submissionError');
  } finally {
    bag.setSubmitting(false);
  }
};

export default withFormik({
  validationSchema,
  mapPropsToValues,
  handleSubmit,
  displayName: 'CrawlForm',
});
