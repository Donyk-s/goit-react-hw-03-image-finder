import React from 'react';
import css from './/Search.module.css';
import { Formik, Form, Field } from 'formik';

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
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <header className={css.Searchbar}>
          <Form className={css.SearchForm}>
            <button type="submit" className={css.SearchForm__button}>
              <span className={css.button__label}>Search</span>
            </button>

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
