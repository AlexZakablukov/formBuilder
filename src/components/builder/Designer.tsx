import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import pattern from '../../assets/pattern.svg';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import { formElements, TElementsType } from './FormElements.tsx';
import DesignerElementWrapper from './DesignerElementWrapper.tsx';

const Designer = () => {
  const { elements, addElement, setSelectedElement, removeElement } =
    useFormBuilderContext();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      if (!active || !over) {
        return;
      }

      const isSidebarCard = active.data.current?.isSidebarCard;
      const isOverDesignerDropArea = over.data.current?.isDesignerDropArea;

      const droppingSidebarCardOverDesignerDropArea =
        isSidebarCard && isOverDesignerDropArea;

      if (droppingSidebarCardOverDesignerDropArea) {
        const type: TElementsType = active.data.current?.type;
        const newElement = formElements[type].construct(uuidv4());
        addElement(elements.length, newElement);
        return;
      }

      const isOverDesignerElementTopHalf =
        over.data.current?.isTopHalfDroppableArea;
      const isOverDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDroppableArea;

      const isOverDesignerElement =
        isOverDesignerElementTopHalf || isOverDesignerElementBottomHalf;

      const droppingSidebarCardOverDesignerElement =
        isSidebarCard && isOverDesignerElement;

      if (droppingSidebarCardOverDesignerElement) {
        const type: TElementsType = active.data.current?.type;
        const newElement = formElements[type].construct(uuidv4());

        const overElementId = over.data.current?.elementId;

        const overElementIndex = elements.findIndex(
          (element) => element.id === overElementId,
        );

        if (overElementIndex === -1) {
          return;
        }

        const newElementIndex = isOverDesignerElementTopHalf
          ? overElementIndex
          : overElementIndex + 1;

        addElement(newElementIndex, newElement);
        return;
      }

      const isDesignerElement = active.data.current?.isDesignerElement;

      if (isDesignerElement && isOverDesignerElement) {
        const activeElementId = active.data.current?.elementId;
        const overElementId = over.data.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeElementId,
        );
        const overElementIndex = elements.findIndex(
          (el) => el.id === overElementId,
        );

        if (activeElementIndex === -1 || overElementIndex === -1) {
          return;
        }

        const newElement = { ...elements[activeElementIndex] };

        removeElement(activeElementId);

        const newElementIndex = isOverDesignerElementTopHalf
          ? overElementIndex
          : overElementIndex + 1;

        addElement(newElementIndex, newElement);
      }
    },
  });

  return (
    <Box
      sx={{
        background: `url("${pattern}")`,
        display: 'flex',
        flexGrow: 1,
        flexBasis: '200px',
        padding: '8px',
        position: 'relative',
        overflowY: 'auto',
      }}
      onClick={() => {
        setSelectedElement(null);
      }}
    >
      <Box
        ref={droppable.setNodeRef}
        sx={{
          flexGrow: 1,
          borderRadius: '12px',
          padding: '8px',
          cursor: droppable.isOver ? 'copy' : 'default',
          border: 1,
          borderColor: droppable.isOver ? 'primary.main' : 'transparent',
        }}
      >
        {droppable.isOver && elements.length === 0 && (
          <Box
            sx={{
              width: '100%',
              height: '120px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.2)',
            }}
          />
        )}
        {elements.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {elements.map((elementInstance) => {
              return (
                <DesignerElementWrapper
                  key={elementInstance.id}
                  elementInstance={elementInstance}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Designer;
