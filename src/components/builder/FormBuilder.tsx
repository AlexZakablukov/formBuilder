import FormBuilderContextProvider from './context/FormBuilderContext.tsx';
import Sidebar from './Sidebar.tsx';
import Designer from './Designer.tsx';
import { Box } from '@mui/material';
import DndWrapper from './DndWrapper.tsx';

const FormBuilder = () => {
  return (
    <FormBuilderContextProvider>
      <DndWrapper>
        <Box sx={styles.wrapper}>
          <Sidebar />
          <Designer />
        </Box>
      </DndWrapper>
    </FormBuilderContextProvider>
  );
};

const styles = {
  wrapper: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '3fr 6fr 3fr',
    overflow: 'hidden',
  },
};

export default FormBuilder;
