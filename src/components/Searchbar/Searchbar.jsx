import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Searchbar.module.css';
// import { ImSearch } from 'react-icons';
import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    console.log('e current Target', e.currentTarget.value);
    this.setState({
      query: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.query.trim() === ''
      ? alert('Enter keyword')
      : this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            {/* <span className={s.SearchForm_button_label}></span> */}
            <FaSearch />
          </button>

          <input
            className={s.SearchForm_input}
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
