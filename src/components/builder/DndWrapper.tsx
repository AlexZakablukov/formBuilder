import { FC, ReactElement, ReactNode } from 'react';
import {
  Active,
  DndContext,
  DragEndEvent,
  MouseSensor,
  Over,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayPlugin from './DragOverlayPlugin.tsx';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import { TElementsType } from './types.ts';

type THandleDropProps = {
  active: Active;
  over: Over;
};

const DndWrapper: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const { addElement, elementsIds, changeElementPosition } =
    useFormBuilderContext();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) return;

    if (handleDropSidebarCardOverDropArea({ active, over })) return;
    if (handleDropSidebarCardOverElement({ active, over })) return;
    if (handleMoveExistingElement({ active, over })) return;
  };

  const handleDropSidebarCardOverDropArea = ({
    active,
    over,
  }: THandleDropProps): boolean => {
    const isSidebarCard = active.data.current?.isSidebarCard;
    const isOverDesignerDropArea = over.data.current?.isDesignerDropArea;

    if (isSidebarCard && isOverDesignerDropArea) {
      const type: TElementsType = active.data.current?.type;
      addElement(type);
      return true;
    }
    return false;
  };

  const handleDropSidebarCardOverElement = ({
    active,
    over,
  }: THandleDropProps): boolean => {
    const isSidebarCard = active.data.current?.isSidebarCard;
    const isOverTopHalf = over.data.current?.isTopHalfDroppableArea;
    const isOverBottomHalf = over.data.current?.isBottomHalfDroppableArea;

    if (isSidebarCard && (isOverTopHalf || isOverBottomHalf)) {
      const type: TElementsType = active.data.current?.type;
      const overElementId = over.data.current?.elementId;

      const overIndex = elementsIds.findIndex((id) => id === overElementId);
      const insertIndex = isOverTopHalf ? overIndex : overIndex + 1;

      addElement(type, insertIndex);
      return true;
    }
    return false;
  };

  const handleMoveExistingElement = ({
    active,
    over,
  }: THandleDropProps): boolean => {
    const isDesignerElement = active.data.current?.isDesignerElement;
    const isOverTopHalf = over.data.current?.isTopHalfDroppableArea;
    const isOverBottomHalf = over.data.current?.isBottomHalfDroppableArea;

    if (isDesignerElement && (isOverTopHalf || isOverBottomHalf)) {
      const activeElementId = active.data.current?.elementId;
      const overElementId = over.data.current?.elementId;

      const overIndex = elementsIds.findIndex((id) => id === overElementId);
      const newIndex = isOverTopHalf ? overIndex : overIndex + 1;

      changeElementPosition(activeElementId, newIndex);
      return true;
    }
    return false;
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      {children}
      <DragOverlayPlugin />
    </DndContext>
  );
};

export default DndWrapper;
