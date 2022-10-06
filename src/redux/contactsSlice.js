import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async function () {
    const response = await fetch('https://633f31c70dbc3309f3c69521.mockapi.io/contact');

    const data = await response.json();
    
    return data;
  }
);
  


// const data = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: null,
    error: null,
  },

  reducers: {
    createContacts(state, action) {state.push(action.payload)},
    deleteContacts(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => { 
      state.status = 'loaging';
      state.error = 'error'
    },
    [fetchContacts.fulfilled]: (state, action) => { 
      state.status = 'resolved';
      state.contacts = action.payload;
      
    },
    [fetchContacts.rejected]: (state, action) => { },
  },
})



export default contactsSlice.reducer;
export const { createContacts, deleteContacts } = contactsSlice.actions;
