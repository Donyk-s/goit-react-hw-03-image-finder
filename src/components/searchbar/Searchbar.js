// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Formik } from 'formik';

// export class Searchbar extends Component {}
import React from 'react';
import css from './/Search.module.css';
import { Formik, Form, Field } from 'formik';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };
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
              type="text"
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
