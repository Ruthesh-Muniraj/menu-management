import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
  const response = await axios.get(`${BASE_URL}/menus`);
  return response.data;
});

interface MenuItem {
  id: string;
  name: string;
  parentId?: string;
  children?: MenuItem[];
}

interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching menus';
      });
  },
});

export default menuSlice.reducer;
