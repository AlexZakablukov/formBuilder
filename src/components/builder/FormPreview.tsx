import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import FormRender from '../render/FormRender.tsx';
import { Box } from '@mui/material';

const FormPreview = () => {
  const { elements } = useFormBuilderContext();

  console.log({ elements });

  const fields = elements.map((element) => {
    return {
      name: (element.extraAttributes?.name as string) || '',
      type: element.type,
      ...element.extraAttributes,
    };
  });

  if (!elements.length) {
    return <div>No form to preview</div>;
  }

  // Todo: transform elements to correct preview data

  return (
    <Box sx={{ padding: '20px' }}>
      <FormRender fields={fields} />
    </Box>
  );
};

export default FormPreview;
