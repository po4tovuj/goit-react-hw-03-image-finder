import PropTypes from 'prop-types';

import { Button } from './LoadMoreButton.styled';
export const LoadMoreButton = ({ handleClick }) => (
  <Button onClick={handleClick}>Load More</Button>
);

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func,
};
