import PropTypes from 'prop-types';

import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
export const Gallery = ({ images }) => {
  return (
    <>
      <List id="gallery-list">
        {images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <GalleryItem
              key={id}
              url={webformatURL}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </List>
    </>
  );
};
Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  loadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
  isLoading: PropTypes.bool,
};
