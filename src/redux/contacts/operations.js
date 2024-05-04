import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-hot-toast";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
    //   console.log("response.data = ", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      // console.log(response.data);
      toast.success('Contact successfully added');
      return response.data;
    } catch (error) {
      toast.error('Error! Contact not added');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      // console.log(response.data);
      toast.success('Contact successfully removed');
      return response.data;
    } catch (error) {
      toast.error('Error! Contact not removed.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const editContact = createAsyncThunk('contacts/editContact', async (contactId, thunkAPI) => {
//   try {
//     const response = await axios.patch(`/contacts/${contactId}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// }
// );

