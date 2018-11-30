import { withFormik } from 'formik';
import * as yup from 'yup';

// validation to perform on fields of form
export const validationSchema = yup.object().shape({
  url: yup.string().required('Starting URL is Required'),
  type: yup.string().required('Search Type is Required'),
  limit: yup.number().max(10).required('Limit is Required'),
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
export const handleSubmit = (values, bag) => {
  bag.props.handleSubmit({ values, bag });
};

// HOC for handling common form functionality
export default withFormik({
  validationSchema,
  mapPropsToValues,
  handleSubmit,
  displayName: 'CrawlForm',
});
