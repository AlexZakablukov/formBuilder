import { ComponentProps, FC } from 'react';
import { TFormRenderProps } from '../render/types.ts';

export type TElementConfigBasic = {
  type: string; // Element type ex: 'textField', 'switch', etc.
  formComponent: FC<never>; // Function to render the element inside form render
  component: FC<never>; // Function to render the element
  initialProps: ComponentProps<FC>;
  editableProps: Omit<TFormRenderProps, 'defaultValues' | 'onSubmit'>;
};
