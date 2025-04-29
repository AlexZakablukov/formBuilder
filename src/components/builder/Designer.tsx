import pattern from '../../assets/pattern.svg';
import { Box } from '@mui/material';
import { MouseEvent } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import DesignerCardWrapper from './DesignerCardWrapper.tsx';
import DesignerCard from './DesignerCard.tsx';

const Designer = () => {
  const { elementsIds, removeElement, setSelectedElementId } =
    useFormBuilderContext();

  const { setNodeRef, isOver } = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  const onClick = (event: MouseEvent) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const closestElementWithAction = target.closest('[data-action]');

    if (!closestElementWithAction) {
      return;
    }

    const action = closestElementWithAction.getAttribute('data-action');

    if (!action) {
      return;
    }

    const elementId = closestElementWithAction
      .closest('[data-id]')
      ?.getAttribute('data-id');

    if (!elementId) {
      return;
    }

    if (action === 'delete') {
      removeElement(elementId);
      return;
    }

    if (action === 'edit') {
      setSelectedElementId(elementId);
      return;
    }
  };

  return (
    <Box sx={styles.wrapper} onClick={onClick}>
      <Box ref={setNodeRef} sx={styles.container(isOver)}>
        {isOver && elementsIds.length === 0 && <Box sx={styles.emptyOver} />}

        {elementsIds.length > 0 && (
          <Box sx={styles.list}>
            {elementsIds.map((elementId) => {
              return (
                <DesignerCardWrapper elementId={elementId} key={elementId}>
                  <DesignerCard elementId={elementId} />
                </DesignerCardWrapper>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  wrapper: {
    background: `url("${pattern}")`,
    display: 'flex',
    flexGrow: 1,
    flexBasis: '200px',
    padding: '8px',
    position: 'relative',
    overflowY: 'auto',
  },
  container: (isOver: boolean) => ({
    flexGrow: 1,
    borderRadius: '12px',
    padding: '8px',
    cursor: isOver ? 'copy' : 'default',
    border: 1,
    borderColor: isOver ? 'primary.main' : 'transparent',
  }),
  emptyOver: {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};

export default Designer;
