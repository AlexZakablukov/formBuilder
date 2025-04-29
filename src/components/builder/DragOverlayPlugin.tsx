import { ReactElement, useState } from 'react';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { TElementsType } from './types.ts';
import SidebarCard from './SidebarCard.tsx';
import DesignerCard from './DesignerCard.tsx';

const DragOverlayPlugin = (): ReactElement | null => {
  const [dragItem, setDragItem] = useState<Active | null>(null);

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
    node = <SidebarCard type={type} />;
  }

  const isDesignerElement = dragItem.data.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = dragItem.data.current?.elementId;
    node = <DesignerCard elementId={elementId} />;
  }

  return <DragOverlay children={node} />;
};

export default DragOverlayPlugin;
