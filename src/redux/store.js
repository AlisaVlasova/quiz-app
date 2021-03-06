import { createStore } from 'redux';
import reducer from './reducer';
import { loadState, saveState } from './sessionStorage';

const persistedState = loadState();
const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
