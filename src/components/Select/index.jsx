import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setCategory,
  setDifficulty,
  setType,
} from '../../redux/actions';

function Select({ label, options }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    switch (label) {
      case 'Category':
        dispatch(setCategory(event.target.value));
        break;
      case 'Difficulty':
        dispatch(setDifficulty(event.target.value));
        break;
      case 'Type':
        dispatch(setType(event.target.value));
        break;
      default:
    }
  };

  return (
    <div className="select">
      <select label={label} onChange={handleChange}>
        {options && options.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
