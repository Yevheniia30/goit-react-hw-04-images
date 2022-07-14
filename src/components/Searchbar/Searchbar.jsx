import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}></span>
          </button>

          <input
            className={s.SearchForm_input}
            style={{ border: 'none', outline: 'none' }}
            // value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            // onChange={this.handleSearch}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {};
