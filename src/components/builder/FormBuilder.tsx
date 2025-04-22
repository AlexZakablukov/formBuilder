import Designer from './Designer.tsx';
import Sidebar from './Sidebar.tsx';
import { Box } from '@mui/material';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper.tsx';
import FormBuilderContextProvider from './context/FormBuilderContext.tsx';
import FormPreview from './FormPreview.tsx';

function FormBuilder() {
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

  return (
    <FormBuilderContextProvider>
      <DndContext sensors={sensors}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: '3fr 6fr 3fr',
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <Designer />
          <FormPreview />
        </Box>
        <DragOverlayWrapper />
      </DndContext>
    </FormBuilderContextProvider>
  );
}

export default FormBuilder;
