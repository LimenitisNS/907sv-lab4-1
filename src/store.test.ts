import { ACTION_TYPE, ADD, REMOVE, REMOVELIST, CHECKED } from './store/types';
import { initialState, reducer } from './store/store';
import { ItemI } from './store/interfaces/itemInterface';

const title = 'item';

const newItem: ItemI = {
  index: 'index',
  value: title,
  isChecked: false
};

test('add item', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const state = reducer(initialState, action);
  expect(state.items.length).toEqual(1);
  expect(state.items[0]).toHaveProperty('index');
  expect(state.items[0].value).toEqual(title);
});

test('remove item', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);

  const removeAction: ACTION_TYPE = {
    type: REMOVE,
    payload: state.items[0].index
  };

  state = reducer(state, removeAction);
  expect(state.items).toHaveLength(0);
});

test('remove list', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);
  state = reducer(state, addAction);

  const removeList: ACTION_TYPE = {
    type: REMOVELIST
  };

  state = reducer(state, removeList);
  expect(state.items).toHaveLength(0);
});

test('checked item', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);

  const checkedAction: ACTION_TYPE = {
    type: CHECKED,
    payload: state.items[0].index
  };

  state = reducer(state, checkedAction);

  expect(state.items[0].isChecked).toBeTruthy();
});