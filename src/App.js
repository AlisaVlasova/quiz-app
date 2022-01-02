import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Settings } from './pages/Settings/index';
import { Questions } from './pages/Questions/index';
import { Result } from './pages/Result/index';

import './App.css';

export function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Settings />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}
