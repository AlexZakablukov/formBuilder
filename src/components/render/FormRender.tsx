import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import FormRenderElement from './FormRenderElement.tsx';
import { TFormRenderProps } from './types.ts';

const FormRender = ({ fields, defaultValues, schema }: TFormRenderProps) => {
  const methods = useForm({
    defaultValues,
    ...(schema ? { resolver: zodResolver(schema) } : {}),
  });

  const onSubmit = (values: unknown) => {
    console.log({ values });
  };

  const onReset = () => {
    methods.reset(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field) => {
          return <FormRenderElement key={field.name} {...field} />;
        })}
        <Stack direction="row" gap="16px">
          <Button color="error" onClick={onReset}>
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default FormRender;
