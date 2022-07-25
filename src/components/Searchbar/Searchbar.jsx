import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './Searchbar.module.css';
// import { ImSearch } from 'react-icons';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    // console.log('e current Target', e.currentTarget.value);
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    query.trim() === '' ? alert('Enter keyword') : onSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          {/* <span className={s.SearchForm_button_label}></span> */}
          <FaSearch />
        </button>

        <input
          className={s.SearchForm_input}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
