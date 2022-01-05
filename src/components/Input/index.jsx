import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';

import {
  setAmount,
} from '../../redux/actions';

function Input({ defaultValue }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setAmount(event.target.value));
  };

  return (
    <div className="input">
      <input
        type="number"
        className="input__field"
        onChange={handleChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}

Input.propTypes = {
  defaultValue: PropTypes.string.isRequired,
};

export default Input;
