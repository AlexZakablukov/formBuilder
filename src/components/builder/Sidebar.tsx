import { Box, IconButton, Typography } from '@mui/material';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import SidebarProperties from './SidebarProperties.tsx';
import SidebarElements from './SidebarElements.tsx';
import { ArrowBackRounded } from '@mui/icons-material';

const Sidebar = () => {
  const { selectedElement, setSelectedElement } = useFormBuilderContext();

  return (
    <Box
      component="aside"
      sx={{
        borderRight: 1,
        borderColor: 'lightgrey',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderBottom: 1,
          borderColor: 'lightgrey',
          height: '48px',
          paddingX: '48px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selectedElement && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              zIndex: 1,
            }}
            onClick={() => {
              setSelectedElement(null);
            }}
            children={<ArrowBackRounded />}
          />
        )}
        <Typography children={selectedElement ? 'Properties' : 'Elements'} />
      </Box>
      <Box p="16px">
        {selectedElement ? <SidebarProperties /> : <SidebarElements />}
      </Box>
    </Box>
  );
};

export default Sidebar;
