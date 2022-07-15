import { Component } from 'react';
import propTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { IconButton } from '../Button/IconButton';
import './Searchbar.css';

export class Searchbar extends Component {
  state = { query: '' };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query === '') {
      toast.error('Enter what you want to find please');
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form
          className="SearchForm"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <IconButton aria-label="Search...">
            <SearchIcon />
          </IconButton>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos..."
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
