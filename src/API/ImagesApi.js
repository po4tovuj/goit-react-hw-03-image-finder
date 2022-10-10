import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '30123951-fc3b3591a8bdf7b509eb401ab';

const defaultUrlParams = new URLSearchParams([
  ...Object.entries({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  }),
]).toString();

export const getImages = ({ query, page, per_page = 20 }) => {
  // debugger;
  const urlParams = new URLSearchParams([
    ['key', API_KEY],
    ['q', query],
    ['page', page],
    ['per_page', per_page],
  ]).toString();
  return axios
    .get(`${BASE_URL}?${urlParams}&${defaultUrlParams}`)
    .then(result => {
      return result.data;
    });
};
