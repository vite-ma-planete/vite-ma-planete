import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
      title="Loading..."
    >
      <CircularProgress />
    </Box>
  );
}
