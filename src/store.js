import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios';

const products = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    return action.products;
  }
  return state;
};

const users = (state = [], action) => {
  if (action.type === 'ADD_USER') {
    return [...state, action.user]
  }
  return state
}

const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  if(action.type === 'ADD_AUTH') {
    return [...state, action.auth]
  }
  return state;
};

export const fetchProducts = ()=> {
  return async(dispatch)=> {
    return dispatch({ type: 'SET_PRODUCTS', products: (await axios.get('/api/products')).data});
  };
};

export const loginWithToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get(`/api/auth/${token}`);
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  };
};

export const createUser = (user) => {
  return async(dispatch) => {
    const response = await axios.post('/api/users', user)
    dispatch({type: 'ADD_USER', user: response.data})
  }
}

export const logout = ()=> {
  return (dispatch)=> {
    window.localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTH', auth: {} });
  };
};

export const login = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth', credentials);
    const token = response.data.token;
    window.localStorage.setItem('token', token);
    dispatch(loginWithToken());
    //dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

const reducer = combineReducers({
  products,
  auth,
  users
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
