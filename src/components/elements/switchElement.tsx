import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TElementConfigBasic } from './types.ts';
import { TFormRenderProps } from '../render/types.ts';

type TSwitchElementProps = SwitchProps & Pick<FormControlLabelProps, 'label'>;

const SwitchElement = (props: TSwitchElementProps) => {
  return (
    <FormControlLabel
      required={props.required}
      disabled={props.disabled}
      label={props.label}
      control={<Switch {...props} />}
    />
  );
};

// This is the form component that will be used in the form builder

type TSwitchElementFormComponentProps = { name: string } & TSwitchElementProps;

const SwitchElementFormComponent = (
  props: TSwitchElementFormComponentProps,
) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { value, onChange } }) => (
        <SwitchElement {...props} checked={value} onChange={onChange} />
      )}
    />
  );
};

const initialProps: TSwitchElementProps = {
  label: 'Switch',
  name: '',
  required: false,
};

const editableProps: Omit<TFormRenderProps, 'defaultValues' | 'onSubmit'> = {
  // schema: z.object({
  //   label: z.string().optional(),
  //   name: z.string().min(2),
  //   required: z.boolean(),
  // }),
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

export const switchElementConfig = {
  type: 'switch' as const,
  formComponent: SwitchElementFormComponent,
  component: SwitchElement,
  initialProps,
  editableProps,
} satisfies TElementConfigBasic;
