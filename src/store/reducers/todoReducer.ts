import { TodoI } from '../interfaces/todoInterface';
import {
  ACTION_TYPE,
  ADD,
  CHECKED,
  EDIT,
  FILTER,
  REMOVE,
  REMOVELIST,
  SEARCH
} from '../actions/todoAction';

export const selectOptions = {
  All: 'Все',
  Completed: 'Выполненные',
  NotCompleted: 'Не выполненные'
};

export const initialState: TodoI = {
  items: [],
  filter: selectOptions.All,
  search: ''
};

export function reducer(state: TodoI = initialState, action: ACTION_TYPE): TodoI {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case REMOVE: {
      return {
        ...state,
        items: [...state.items.filter(item => item.index !== action.payload)]
      };
    }
    case CHECKED: {
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.index === action.payload) {
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        ]
      };
    }
    case REMOVELIST: {
      return initialState;
    }
    case EDIT: {
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.index === action.payload.index) {
              return { ...item, value: action.payload.newValue };
            } else {
              return item;
            }
          })
        ]
      };
    }
    case FILTER: {
      return { ...state, filter: action.payload };
    }
    case SEARCH: {
      return { ...state, search: action.payload };
    }
    default:
      return state;
  }
}
