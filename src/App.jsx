import { useFetchPhotos } from './hooks/useFetchPhotos';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Table } from './components/Table';

function App() {
  const { photos, loading } = useFetchPhotos();
  return (
    <Box
      sx={{
        textAlign: 'center',
        width: '90%',
        marginX: 'auto',
        marginY: '20px',
        paddingY: '20px',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? <CircularProgress /> : <Table photos={photos} />}
    </Box>
  );
}

export default App;
