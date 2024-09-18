import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Container } from '@mui/material';
import CharacterTable from './components/CharacterTable';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="lg">
        <CharacterTable />
      </Container>
    </Provider>
  );
};

export default App;
