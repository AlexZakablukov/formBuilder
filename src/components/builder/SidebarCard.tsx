import { TFormElement } from './FormElements.tsx';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

type TSidebarBtnProps = {
  formElement: TFormElement;
};

const SidebarCard = ({ formElement }: TSidebarBtnProps) => {
  const { icon: Icon, label } = formElement;

  const draggable = useDraggable({
    id: `sidebarCard-${formElement.type}`,
    data: {
      type: formElement.type,
      isSidebarCard: true,
    },
  });

  return (
    <Card
      ref={draggable.setNodeRef}
      sx={{
        cursor: 'grab',
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <CardHeader
        avatar={<Icon />}
        sx={{ borderBottom: '1px solid', borderColor: 'lightgrey', p: '8px' }}
      />
      <CardContent sx={{ p: '8px !important' }}>
        <Typography children={label} />
      </CardContent>
    </Card>
  );
};

export const SidebarCardDragOverlay = ({ formElement }: TSidebarBtnProps) => {
  const { icon: Icon, label } = formElement;

  return (
    <Card sx={{ cursor: 'grabbing' }}>
      <CardHeader
        avatar={<Icon />}
        sx={{ borderBottom: '1px solid', borderColor: 'lightgrey', p: '8px' }}
      />
      <CardContent sx={{ p: '8px !important' }}>
        <Typography children={label} />
      </CardContent>
    </Card>
  );
};

export default SidebarCard;
