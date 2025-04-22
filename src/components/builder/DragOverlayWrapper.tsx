import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { SidebarCardDragOverlay } from './SidebarCard.tsx';
import { formElements, TElementsType } from './FormElements.tsx';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import DesignerElementCard from './DesignerElementCard.tsx';

const DragOverlayWrapper = () => {
  const [dragItem, setDragItem] = useState<Active | null>(null);
  const { elements } = useFormBuilderContext();

  useDndMonitor({
    onDragStart: ({ active }) => {
      setDragItem(active);
    },
    onDragEnd: () => {
      setDragItem(null);
    },
    onDragCancel: () => {
      setDragItem(null);
    },
  });

  if (!dragItem) {
    return null;
  }

  let node;

  const isSidebarCard = dragItem.data.current?.isSidebarCard;

  if (isSidebarCard) {
    const type: TElementsType = dragItem.data.current?.type;
    node = <SidebarCardDragOverlay formElement={formElements[type]} />;
  }

  const isDesignerElement = dragItem.data.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = dragItem.data.current?.elementId;
    const elementInstance = elements.find(
      (element) => element.id === elementId,
    );

    if (!elementInstance) {
      node = <div>Element not found</div>;
      return;
    }

    node = (
      <DesignerElementCard
        elementInstance={elementInstance}
        sx={{ cursor: 'grabbing' }}
      />
    );
  }

  return <DragOverlay children={node} />;
};

export default DragOverlayWrapper;
