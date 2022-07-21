import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
class Searchbar extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};
	state = { query: '' };
	handleChange = (e) => {
		this.setState({ query: e.currentTarget.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state.query);
		this.setState({ query: '' });
	};
	render() {
		return (
			<header className={styles.Searchbar}>
				<form className={styles.SearchForm} onSubmit={this.handleSubmit}>
					<button type="submit" className={styles.SearchForm__button}>
						<span className={styles.SearchForm__buttonLabel}></span>
					</button>

					<input
						className={styles.SearchForm__input}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
						value={this.state.query}
						onChange={this.handleChange}
					/>
				</form>
			</header>
		);
	}
}

export default Searchbar;
