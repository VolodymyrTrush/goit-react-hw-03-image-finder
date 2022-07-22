import React, { Component } from 'react';
import imagesApi from '../services/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

import styles from '../components/Style.module.css';

class App extends Component {
	state = {
		images: [],
		currentPage: 1,
		searchQuery: '',
		isLoading: false,
		error: null,
		showModal: false,
		imageModal: '',
	};
	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchQuery !== this.state.searchQuery) {
			this.fetchImages();
		}
	}
	onChangeQuery = (query) => {
		this.setState({
			searchQuery: query,
			currentPage: 1,
			images: [],
			error: null,
		});
	};

	fetchImages = () => {
		const { currentPage, searchQuery } = this.state;
		const option = {
			searchQuery,
			currentPage,
		};
		this.setState({ isLoading: true });
		imagesApi(option)
			.then((hits) => {
				this.setState((prevState) => ({
					images: [...prevState.images, ...hits],
					currentPage: prevState.currentPage + 1,
				}));
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'smooth',
				});
			})
			.catch((error) => this.setState({ error }))
			.finally(() => this.setState({ isLoading: false }));
	};
	openModal = (event) => {
		if (event.target.nodeName === 'IMG') {
			console.log(event.target.dataset.url);
			this.setState({
				imageModal: event.target.dataset.url,
				showModal: true,
			});
		}
	};

	closeModal = (event) => {
		this.setState({
			imageModal: '',
			showModal: false,
		});
	};
	render() {
		const { images, isLoading, error, imageModal, showModal } = this.state;
		const showLoadMoreBtn = images.length > 0 && !isLoading;

		return (
			<div className={styles.App}>
				<Searchbar onSubmit={this.onChangeQuery} />
				{error && <p>Что-то пошло не так.</p>}
				<ImageGallery list={images} onClick={this.openModal} />
				{showModal && (
					<Modal onClose={this.closeModal}>
						<img src={imageModal} alt="" />
					</Modal>
				)}
				{isLoading && <Loader />}
				{showLoadMoreBtn && <Button onClick={this.fetchImages} />}
			</div>
		);
	}
}
export default App;
