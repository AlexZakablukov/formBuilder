import { TFormElement } from '../../FormElements.tsx';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DesignerComponent from './DesignerComponent.tsx';
import PropertiesComponent from './PropertiesComponent.tsx';
import { extraAttributes, type } from './consts.ts';

export const textFieldFormElement: TFormElement = {
  type,
  icon: TextFieldsIcon,
  label: 'Text Field',

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      ...extraAttributes,
      name: id,
    },
  }),

  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
};
