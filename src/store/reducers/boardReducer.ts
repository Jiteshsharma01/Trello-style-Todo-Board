import { BoardState } from "../../types";
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  ADD_STATUS,
  DELETE_STATUS,
  UPDATE_TODOS_ORDER,
} from "../actions/boardActions";

const initialState: BoardState = {
  todos: [],
  loading: false,
  error: null,
  statuses: ["Pending", "In Progress", "Completed"],
};

const boardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload };
    case FETCH_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TODO:
      // add latest to initial
      return { ...state, todos: [action.payload, ...state.todos] };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ADD_STATUS:
      return {
        ...state,
        statuses: [...state.statuses, action.payload],
      };
    case DELETE_STATUS:
      return {
        ...state,
        statuses: state.statuses.filter((s) => s !== action.payload),
      };
    case UPDATE_TODOS_ORDER:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};

export default boardReducer;
