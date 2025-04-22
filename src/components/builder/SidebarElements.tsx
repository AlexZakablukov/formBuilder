import { formElements } from './FormElements.tsx';
import SidebarCard from './SidebarCard.tsx';
import { Box } from '@mui/material';

const SidebarElements = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
      }}
    >
      <SidebarCard formElement={formElements.textField} />
    </Box>
  );
};

export default SidebarElements;
