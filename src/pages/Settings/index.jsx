import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Select from '../../components/Select';
import Input from '../../components/Input';
import getCategory from '../../api';

function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);

  const navigate = useNavigate();

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
      getCategory()
        .then((categories) => {
          console.log(categories);
          setCategoryOptions(categories.trivia_categories);
        });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questions');
  };

  useEffect(() => {
    getCategoryOptions();
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <p>
        Something Went Wrong!
        <br />
        Please, try again later
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="settings__label">
        Select category:
      </p>
      <Select options={categoryOptions} label="Category" />
      <p className="settings__label">
        Select difficulty:
      </p>
      <Select options={difficultyOptions} label="Difficulty" />
      <p className="settings__label">
        Select question type:
      </p>
      <Select options={typeOptions} label="Type" />
      <p className="settings__label">
        Amount of questions:
      </p>
      <Input />
      <button
        type="submit"
        disabled={!category || !difficulty || !type || !amount}
      >
        Go!
      </button>
    </form>
  );
}

export default Settings;
