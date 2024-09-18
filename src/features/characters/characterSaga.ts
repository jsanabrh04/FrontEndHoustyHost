import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  syncCharactersRequest,
  syncCharactersSuccess,
  syncCharactersFailure,
} from './characterSlice';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: string;
}

function* fetchCharactersSaga(action: ReturnType<typeof fetchCharactersRequest>) {
  try {
    const { page, pageSize, searchTerm } = action.payload;
    const response: { data: { data: Character[]; total: number } } = yield call(axios.get, 'http://localhost:5432/characters/getData', {
      params: {
        name: searchTerm,
        page: page + 1,
        limit: pageSize,
      },
    });
    const { data, total } = response.data;
    yield put(fetchCharactersSuccess({ data, total }));
  } catch (error) {
    yield put(fetchCharactersFailure());
    console.error(error);
  }
}

function* syncCharactersSaga() {
  try {
    yield call(axios.post, 'http://localhost:5432/characters/upsert');
    yield put(syncCharactersSuccess());
    yield put(fetchCharactersRequest({ page: 0, pageSize: 10, searchTerm: '' }));
  } catch (error) {
    yield put(syncCharactersFailure());
    console.error(error);
  }
}


export default function* charactersSaga() {
  yield takeLatest(fetchCharactersRequest.type, fetchCharactersSaga);
  yield takeLatest(syncCharactersRequest.type, syncCharactersSaga);
}
