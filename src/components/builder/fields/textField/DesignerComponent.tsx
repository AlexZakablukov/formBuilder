import { TDefaultComponentProps } from '../../FormElements.tsx';
import { TextField } from '@mui/material';
import { TCustomFormElementInstance } from './types.ts';

const DesignerComponent = (props: TDefaultComponentProps) => {
  const elementInstance = props.elementInstance as TCustomFormElementInstance;

  const { label, required } = elementInstance.extraAttributes;

  return (
    <TextField required={required} label={label} size="small" disabled={true} />
  );
};

export default DesignerComponent;
