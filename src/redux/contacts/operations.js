import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-hot-toast";

const baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/contacts`);
      return response.data;
    } catch (error) {
      toast.error('API Error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/contacts`, contact);
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
      const response = await axios.delete(`${baseURL}/contacts/${contactId}`);
      toast.success('Contact successfully removed');
      return response.data;
    } catch (error) {
      toast.error('Error! Contact not removed.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk('contacts/editContact', async ({ contactId, data }, thunkAPI) => {
  try {
    const response = await axios.patch(`${baseURL}/contacts/${contactId}`, data);
    toast.success('Contact successfully edited');
    return response.data;
  } catch (error) {
    toast.error('Error! Contact not edited.');
    return thunkAPI.rejectWithValue(error.message);
  }
});
