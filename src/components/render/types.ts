import { TTextFieldProps } from './fields/TextField.tsx';

export type TFormRenderProps = {
  fields: TFieldProps[];
  defaultValues?: Record<string, unknown>;
  schema?: unknown;
};

export type TFieldProps = TTextFieldProps;
