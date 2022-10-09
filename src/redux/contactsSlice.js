import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact} from './requestServer';

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
    isLoading: false,
    error: null,
  },

  
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {
      state.isLoading = 'true';
      state.error = 'null';
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeContact.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [removeContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    [removeContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    },
    [addContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default contactsSlice.reducer;
export const { createContacts, deleteContacts } = contactsSlice.actions;
