import { TDefaultComponentProps } from '../../FormElements.tsx';
import { useFormBuilderContext } from '../../context/FormBuilderContext.tsx';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEvent, useEffect } from 'react';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { z } from 'zod';
import { TCustomFormElementInstance, TExtraAttributes } from './types.ts';

const schema = z.object({
  name: z.string(),
  label: z.string(),
  required: z.boolean(),
});

const PropertiesComponent = (props: TDefaultComponentProps) => {
  const elementInstance = props.elementInstance as TCustomFormElementInstance;

  const { updateElement } = useFormBuilderContext();

  const { label, required, name } = elementInstance.extraAttributes;

  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      label,
      required,
      name,
    },
    resolver: zodResolver(schema),
  });

  const onSave = (values: TExtraAttributes) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttributes: {
        ...elementInstance.extraAttributes,
        ...values,
      },
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  useEffect(() => {
    reset(elementInstance.extraAttributes);
  }, [elementInstance, reset]);

  return (
    <form
      onBlur={handleSubmit(onSave)}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Name"
              size="small"
              fullWidth
              sx={{ mb: 1 }}
              slotProps={{
                htmlInput: {
                  onKeyDown: onKeyDown,
                },
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="label"
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Label"
              size="small"
              fullWidth
              sx={{ mb: 1 }}
              slotProps={{
                htmlInput: {
                  onKeyDown: onKeyDown,
                },
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="required"
        render={({ field }) => {
          return (
            <FormControlLabel
              required
              control={
                <Switch checked={field.value} onChange={field.onChange} />
              }
              label="Required"
            />
          );
        }}
      />
    </form>
  );
};

export default PropertiesComponent;
