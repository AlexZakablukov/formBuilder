import { useDraggable } from '@dnd-kit/core';
import { TElementsType } from './types.ts';
import { FC, ReactElement, ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

type TSidebarCardWrapperProps = {
  type: TElementsType;
  children: ReactNode;
} & BoxProps;

const SidebarCardWrapper: FC<TSidebarCardWrapperProps> = ({
  type,
  children,
  ...rest
}): ReactElement => {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `sidebarCard-${type}`,
    data: {
      type: type,
      isSidebarCard: true,
    },
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        cursor: 'grab',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default SidebarCardWrapper;
