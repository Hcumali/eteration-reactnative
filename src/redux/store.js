import { configureStore } from '@reduxjs/toolkit'
import simpsonReducer from './simpsons';

export default configureStore({
  reducer: {
    simpsons: simpsonReducer
  }
});