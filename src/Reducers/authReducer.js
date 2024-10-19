// src/context/authReducer.js

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOAD_USER = "LOAD_USER";
export const SET_LOADING = "SET_LOADING";

// Initial state
export const initialState = {
  user: null,
  loading: true,
  error: null,
};

// Reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, loading: false };
    case LOGOUT:
      return { ...state, user: null, loading: false };
    case LOAD_USER:
      return { ...state, user: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
