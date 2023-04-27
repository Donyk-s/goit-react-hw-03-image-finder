// import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
// import css from './/App.module.css';
export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={console.log} />
    </div>
  );
};
