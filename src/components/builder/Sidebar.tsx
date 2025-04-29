import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import SidebarElements from './SidebarElements.tsx';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import SidebarProperties from './SidebarProperties.tsx';

const Sidebar = () => {
  const { selectedElementId, setSelectedElementId } = useFormBuilderContext();

  return (
    <Box component="aside" sx={styles.wrapper}>
      <Box sx={styles.header}>
        {selectedElementId && (
          <IconButton
            sx={styles.icon}
            onClick={() => {
              setSelectedElementId(null);
            }}
            children={<ArrowBackRounded />}
          />
        )}
        <Typography children={selectedElementId ? 'Properties' : 'Elements'} />
      </Box>
      <Box p="16px">
        {selectedElementId ? <SidebarProperties /> : <SidebarElements />}
      </Box>
    </Box>
  );
};

const styles = {
  wrapper: {
    borderRight: 1,
    borderColor: 'lightgrey',
  },
  header: {
    position: 'relative',
    borderBottom: 1,
    borderColor: 'lightgrey',
    height: '48px',
    paddingX: '48px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    zIndex: 1,
  },
};

export default Sidebar;
