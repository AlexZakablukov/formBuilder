import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TElementConfigBasic } from './types.ts';
import { TFormRenderProps } from '../render/types.ts';
import * as z from 'zod';

// This is the form component that will be used in the form builder

type TTextFieldElementFormComponentProps = { name: string } & Omit<
  TextFieldProps,
  'name'
>;

const TextFieldElementFormComponent = ({
  name,
  ...props
}: TTextFieldElementFormComponentProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          {...props}
          value={value}
          onChange={onChange}
          {...(error && {
            error: true,
            helperText: error.message,
          })}
        />
      )}
    />
  );
};

const initialProps: TextFieldProps = {
  label: 'Text Field',
  name: '',
  required: false,
  disabled: false,
  variant: 'outlined',
  size: 'small',
  fullWidth: true,
};

const editableProps: Omit<TFormRenderProps, 'defaultValues' | 'onSubmit'> = {
  schema: z.object({
    label: z.string().optional(),
    name: z.string().min(2),
    required: z.boolean(),
  }),
  elements: [
    {
      type: 'textField',
      props: {
        name: 'label',
        label: 'Label',
        placeholder: 'Type Label',
        fullWidth: true,
      },
    },
    {
      type: 'textField',
      props: {
        name: 'name',
        label: 'Name',
        placeholder: 'Type name',
        fullWidth: true,
      },
    },
    {
      type: 'switch',
      props: {
        name: 'required',
        label: 'Required',
      },
    },
  ],
};

export const textFieldElementConfig = {
  type: 'textField' as const,
  formComponent: TextFieldElementFormComponent,
  component: TextField,
  initialProps,
  editableProps,
} satisfies TElementConfigBasic;
