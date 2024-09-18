import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: string;
}

interface CharactersState {
  data: Character[];
  total: number;
  loading: boolean;
  syncing: boolean;
}

const initialState: CharactersState = {
  data: [],
  total: 0,
  loading: false,
  syncing: false,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersRequest(state, action: PayloadAction<{ page: number; pageSize: number; searchTerm: string }>) {
      state.loading = true;
    },
    fetchCharactersSuccess(state, action: PayloadAction<{ data: Character[]; total: number }>) {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.loading = false;
    },
    fetchCharactersFailure(state) {
      state.loading = false;
    },
    syncCharactersRequest(state) {
      state.syncing = true;
    },
    syncCharactersSuccess(state) {
      state.syncing = false;
    },
    syncCharactersFailure(state) {
      state.syncing = false;
    },
  },
});

export const {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  syncCharactersRequest,
  syncCharactersSuccess,
  syncCharactersFailure,
} = charactersSlice.actions;

export default charactersSlice.reducer;
