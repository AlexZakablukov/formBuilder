import FormBuilder from './components/builder/FormBuilder.tsx';
import { Box, CssBaseline } from '@mui/material';

function App() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <FormBuilder />
    </Box>
  );
}

export default App;
