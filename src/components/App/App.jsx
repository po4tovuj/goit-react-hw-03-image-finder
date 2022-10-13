import { Component } from 'react';

import { Notify } from 'notiflix';
import { getImages } from 'API/ImagesApi';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { Header } from 'components/SearchBar/SearchBar';

import Loader from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

import { Container } from './App.styled';
const INITIAL_STATE = {
  images: [],
  searchQuery: '',
  page: 1,
  totalPages: 1,
  isLoading: false,
};
const options = {
  position: 'left-top',
  fontSize: '20px',
  width: 'fit-content',
  timeout: 1500,
  showOnlyTheLastOne: true,
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  /** I dont understand why to do it in this way but its the only place and case i see were to use life cycle hooks for this task */
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, images } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.doSearch();
    }
    if (page > 1) {
      const { height: cardHeight } = document
        .querySelector('#gallery-list')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }
  doSearch = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    getImages({ query: searchQuery, page })
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          throw new Error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
        const totalPages = Math.ceil(totalHits / 20);
        const isFristSearch = page === 1;
        this.setState(({ images, page, isLoading }) => {
          return {
            images: !isFristSearch ? images.concat(hits) : hits,
            totalPages,
            isLoading: !isLoading,
          };
        });
        if (isFristSearch) {
          Notify.success(`Hooray! We found ${totalHits} images.`, options);
        }
        return { images: hits, totalPages, page: 1 };
      })
      .catch(err => {
        const message = err.message;
        Notify.failure(message, options);
        this.setState(({ isLoading }) => ({
          isLoading: !isLoading,
        }));
      });
  };
  handleFilterQueryChange = query => {
    this.setState({ searchQuery: query.trim().toLowerCase() });
  };

  render() {
    const { page, totalPages, isLoading } = this.state;
    const isLastPage = page === totalPages;
    return (
      <Container>
        <Header onFilterChange={this.handleFilterQueryChange}></Header>
        <Gallery images={this.state.images}></Gallery>
        {isLoading && <Loader />}
        {!isLastPage && !isLoading && (
          <LoadMoreButton
            handleClick={() =>
              this.setState(({ page }) => ({ page: page + 1 }))
            }
          />
        )}
      </Container>
    );
  }
}
