const BASE_URL = 'https://opentdb.com';

const getCategory = () => (
  fetch(`${BASE_URL}/api_category.php`)
    .then((response) => response.json())
);

export default getCategory;
