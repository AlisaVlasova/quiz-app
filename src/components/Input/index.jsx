import React from 'react';
import { useDispatch } from 'react-redux';

import {
  setAmount,
} from '../../redux/actions';

function Input() {
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
      />
    </div>
  );
}

export default Input;
