import { createSlice } from '@reduxjs/toolkit'

export const simpsonsSlice = createSlice({
  name: 'simpsons',
  initialState: {
    simpsonsList: [],
  },
  reducers: {
    setList: (state, action) => {
      state.simpsonsList = action.payload;
    },
    addCharacter: (state, action) => {
      state.simpsonsList = state.simpsonsList.concat(action.payload);
    },
    removeCharacter: (state, action) => {
      state.simpsonsList = state.simpsonsList.filter(item => item.id !== action.payload)
    },
    carryUp: (state, action) => {
      let index = state.simpsonsList.findIndex(item => item.id === action.payload);
      state.simpsonsList.splice(index - 1, 0, state.simpsonsList.splice(index, 1)[0]);
    },
    carryDown: (state, action) => {
      let index = state.simpsonsList.findIndex(item => item.id === action.payload);
      state.simpsonsList.splice(index + 1, 0, state.simpsonsList.splice(index, 1)[0]);
    },
  },
})

export const { setList, addCharacter, removeCharacter, carryUp, carryDown } = simpsonsSlice.actions
export default simpsonsSlice.reducer