import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { TextField, Box, Typography, Button } from '@mui/material';
import { RootState, AppDispatch } from '../store';
import {
  fetchCharactersRequest,
  syncCharactersRequest,
} from '../features/characters/characterSlice';

const CharacterTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: characters, total, loading, syncing } = useSelector((state: RootState) => state.characters);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    dispatch(fetchCharactersRequest({ page: paginationModel.page, pageSize: paginationModel.pageSize, searchTerm }));
  }, [dispatch, paginationModel, searchTerm]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'species', headerName: 'Species', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'location', headerName: 'Location', width: 200 },
  ];

  const handleSyncCharacters = () => {
    dispatch(syncCharactersRequest());
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Rick and Morty Characters
      </Typography>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSyncCharacters}
        disabled={syncing}
        sx={{ mb: 2 }}
      >
        {syncing ? 'Syncing...' : 'Sync Characters'}
      </Button>

      <DataGrid
        rows={characters}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default CharacterTable;
