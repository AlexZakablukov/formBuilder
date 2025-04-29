import { ELEMENTS_CONFIG_MAP } from '../elements';
import { ComponentProps } from 'react';
import { Schema } from 'zod';

export type TElement = {
  [K in keyof typeof ELEMENTS_CONFIG_MAP]: {
    type: K;
    props: ComponentProps<(typeof ELEMENTS_CONFIG_MAP)[K]['formComponent']>;
  };
}[keyof typeof ELEMENTS_CONFIG_MAP];

export type TFormRenderProps = {
  elements: TElement[];
  onSubmit: (values: Record<PropertyKey, unknown>) => void;
  schema?: Schema;
  defaultValues?: TElement['props'];
};
