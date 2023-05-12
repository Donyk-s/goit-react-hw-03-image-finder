import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Api from '../service/Api;
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const SearchInputSchema = Yup.object().shape({
  search: Yup.string('Enter more than 1 character')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^\S*$/, 'Spaces are not allowed')
    .test(
      'is-valid-search',
      'Search can only contain letters and numbers',
      value => {
        return /^[a-zA-Z0-9]+$/.test(value);
      }
    ),
});

export const Searchbar = ({ onSubmit }) => {
  function handleSubmit(values, { resetForm }) {
    const { search } = values;
    onSubmit(search);
    resetForm();
  }

  return (
    <div>
      <Formik
        initialValues={{ search: '' }}
        validationSchema={SearchInputSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <header className={css.Searchbar}>
            <Form className={css.SearchForm}>
              <button type="submit" className={css.SearchForm__button}>
                <span className={css.button__label}>Search</span>
              </button>
              <ErrorMessage name="search" className={css.ErrorMessage} />
              <Field
                name="search"
                className={css.SearchForm__input}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </Form>
          </header>
        )}
      </Formik>
    </div>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
