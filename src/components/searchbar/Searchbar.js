import React from 'react';
import css from './/Search.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const SearchInputSchema = Yup.object().shape({
  search: Yup.string('Enter more than 1 character')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('A term value must be entered'),
});

export const Searchbar = ({ onSubmit }) => {
  function handleSubmit(values, { resetForm }) {
    const search = {
      search: values.search,
    };
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
      </Formik>
    </div>
  );
};
