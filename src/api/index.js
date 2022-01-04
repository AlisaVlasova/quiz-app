const BASE_URL = 'https://opentdb.com';

export const getCategory = () => (
  fetch(`${BASE_URL}/api_category.php`)
    .then((response) => response.json())
    .then((result) => result)
);

export const getQuestions = (data) => {
  let url = `/api.php?amount=${data.amount}`;

  if (data.category) {
    url += `&category=${data.category}`;
  }
  if (data.difficulty) {
    url += `&difficulty=${data.difficulty}`;
  }
  if (data.type) {
    url += `&type=${data.type}`;
  }

  return fetch(BASE_URL + url)
    .then((response) => response.json())
    .then((result) => result);
};
