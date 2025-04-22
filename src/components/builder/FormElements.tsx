import { ElementType, FC } from 'react';
import { textFieldFormElement } from './fields/textField';

export type TElementsType = 'textField';

export type TFormElement = {
  type: TElementsType;
  icon: ElementType;
  label: string;

  construct: (id: string) => TFormElementInstance;

  designerComponent: FC<TDefaultComponentProps>;
  propertiesComponent: FC<TDefaultComponentProps>;
};

export type TFormElementInstance = {
  id: string;
  type: TElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type TDefaultComponentProps = {
  elementInstance: TFormElementInstance;
};

export type FormElements = {
  [key in TElementsType]: TFormElement;
};

export const formElements: FormElements = {
  textField: textFieldFormElement,
};
