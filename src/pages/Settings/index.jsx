import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Select from '../../components/Select';
import Input from '../../components/Input';

import {
  setQuestions,
  setCurrentIndex,
  setCorrect,
} from '../../redux/actions';
import { getCategory } from '../../api';

function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = useSelector((state) => state.questionCategory);
  const difficulty = useSelector((state) => state.questionDifficulty);
  const type = useSelector((state) => state.questionType);
  const amount = useSelector((state) => state.amountOfQuestions);

  const difficultyOptions = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];
  const typeOptions = [
    { id: 'multiple', name: 'Multiple Choise' },
    { id: 'boolean', name: 'Single Choise' },
  ];

  const getCategoryOptions = async () => {
    setError(null);
    setLoading(true);

    try {
      const categories = await getCategory();

      setCategoryOptions(categories.trivia_categories);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const clearQuestions = () => {
    dispatch(setQuestions(null));
    dispatch(setCurrentIndex(0));
    dispatch(setCorrect([]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    clearQuestions();
    navigate('/questions');
  };

  useEffect(() => {
    getCategoryOptions();
  }, []);

  if (loading) {
    return (
      <p className="loader">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="error">
        Something Went Wrong!
        <br />
        Please, try again later
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="settings">
      <p className="settings__label">
        Select category:
      </p>
      <Select
        options={categoryOptions}
        label="Category"
        defaultValue={category}
      />

      <p className="settings__label">
        Select difficulty:
      </p>
      <Select
        options={difficultyOptions}
        label="Difficulty"
        defaultValue={difficulty}
      />

      <p className="settings__label">
        Select question type:
      </p>
      <Select
        options={typeOptions}
        label="Type"
        defaultValue={type}
      />

      <p className="settings__label">
        Amount of questions:
      </p>
      <Input defaultValue={amount} />

      <button
        className="settings__btn"
        type="submit"
      >
        Go!
      </button>
    </form>
  );
}

export default Settings;
