import { TFormElementInstance } from './FormElements.tsx';
import { Box } from '@mui/material';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import DesignerElementCard from './DesignerElementCard.tsx';

type TDesignerElementWrapperProps = {
  elementInstance: TFormElementInstance;
};

const DesignerElementWrapper = ({
  elementInstance,
}: TDesignerElementWrapperProps) => {
  const topHalfDroppableArea = useDroppable({
    id: `${elementInstance.id}-top`,
    data: {
      type: elementInstance.type,
      elementId: elementInstance.id,
      isTopHalfDroppableArea: true,
    },
  });

  const bottomHalfDroppableArea = useDroppable({
    id: `${elementInstance.id}-bottom`,
    data: {
      type: elementInstance.type,
      elementId: elementInstance.id,
      isBottomHalfDroppableArea: true,
    },
  });

  const draggable = useDraggable({
    id: `${elementInstance.id}-draggable`,
    data: {
      type: elementInstance.type,
      elementId: elementInstance.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) {
    return null;
  }

  return (
    <Box
      ref={draggable.setNodeRef}
      sx={{
        position: 'relative',
        cursor: 'grab',
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Box
        ref={topHalfDroppableArea.setNodeRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          top: 0,
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          pointerEvents: 'none',
          // ...topHalfDroppableArea.isOver ? {background: 'green'} : {}
        }}
      />
      {topHalfDroppableArea.isOver && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            width: '100%',
            height: '6px',
            backgroundColor: 'primary.main',
          }}
        />
      )}
      <DesignerElementCard elementInstance={elementInstance} />
      {bottomHalfDroppableArea.isOver && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
            width: '100%',
            height: '6px',
            backgroundColor: 'primary.main',
          }}
        />
      )}
      <Box
        ref={bottomHalfDroppableArea.setNodeRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          bottom: 0,
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          pointerEvents: 'none',
          // ...bottomHalfDroppableArea.isOver ? {background: 'red'} : {}
        }}
      />
    </Box>
  );
};

export default DesignerElementWrapper;
