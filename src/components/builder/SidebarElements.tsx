import { TElementsType } from './types.ts';
import SidebarCard from './SidebarCard.tsx';
import { Box } from '@mui/material';
import SidebarCardWrapper from './SidebarCardWrapper.tsx';

const SIDEBAR_ELEMENTS_TYPES: TElementsType[] = ['textField', 'switch'];

const SidebarElements = () => {
  return (
    <Box sx={styles.wrapper}>
      {SIDEBAR_ELEMENTS_TYPES.map((type) => {
        return (
          <SidebarCardWrapper key={type} type={type}>
            <SidebarCard type={type} />
          </SidebarCardWrapper>
        );
      })}
    </Box>
  );
};

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  },
};

export default SidebarElements;
