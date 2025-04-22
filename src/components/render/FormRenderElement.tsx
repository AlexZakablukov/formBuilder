import TextFieldFormElement from './fields/TextField.tsx';
import { TFieldProps } from './types.ts';

const FormRenderElement = ({ type, ...rest }: TFieldProps) => {
  switch (type) {
    case 'textField':
      return <TextFieldFormElement {...rest} />;
    default:
      return null;
  }
};

export default FormRenderElement;
