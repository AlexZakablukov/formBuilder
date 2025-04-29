import { FC, ReactElement, ReactNode } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';

type TDesignerCardWrapperProps = {
  elementId: string;
  children: ReactNode;
};

const DesignerCardWrapper: FC<TDesignerCardWrapperProps> = ({
  elementId,
  children,
}): ReactElement | null => {
  const { elements } = useFormBuilderContext();

  const element = elements.get(elementId);

  const topHalfDroppableArea = useDroppable({
    id: `${elementId}-top`,
    disabled: !element,
    data: {
      elementId,
      isTopHalfDroppableArea: true,
    },
  });

  const bottomHalfDroppableArea = useDroppable({
    id: `${elementId}-bottom`,
    disabled: !element,
    data: {
      elementId,
      isBottomHalfDroppableArea: true,
    },
  });

  const draggable = useDraggable({
    id: `${elementId}-draggable`,
    disabled: !element,
    data: {
      elementId,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging || !element) {
    return null;
  }

  return (
    <Box
      ref={draggable.setNodeRef}
      sx={styles.cardWrapper}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {children}
      <Box
        ref={topHalfDroppableArea.setNodeRef}
        sx={[styles.cardHalf, styles.cardTopHalf]}
      />
      {topHalfDroppableArea.isOver && (
        <Box sx={[styles.cardBorder, styles.cardTopBorder]} />
      )}
      {bottomHalfDroppableArea.isOver && (
        <Box sx={[styles.cardBorder, styles.cardBottomBorder]} />
      )}
      <Box
        ref={bottomHalfDroppableArea.setNodeRef}
        sx={[styles.cardHalf, styles.cardBottomHalf]}
      />
    </Box>
  );
};

const styles = {
  cardWrapper: {
    position: 'relative',
    cursor: 'grab',
  },
  cardHalf: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    pointerEvents: 'none',
  },
  cardTopHalf: {
    top: 0,
  },
  cardBottomHalf: {
    bottom: 0,
  },
  cardBorder: {
    position: 'absolute',
    width: '100%',
    height: '6px',
    backgroundColor: 'primary.main',
  },
  cardTopBorder: {
    top: 0,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  cardBottomBorder: {
    bottom: 0,
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  },
};

export default DesignerCardWrapper;
