import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filters: {
    name: '',
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        console.log('action.payload:', action.payload);
        state.items = action.payload;  
        console.log('Contacts fetched successfully:', state.items);
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addContact.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectFilteredContacts = createSelector(
  state => state.contacts.items,
  state => state.filters.name.toLowerCase(),
  (contacts, filter) => {
    return Array.isArray(contacts) ? contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    ) : [];
  }
);

export const contactsReducer = contactsSlice.reducer;
