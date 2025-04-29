import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import { ELEMENTS_CONFIG_MAP } from '../elements';
import { ComponentType, FC, ReactElement, useEffect } from 'react';
import { TFormRenderProps } from './types.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const FormRender: FC<TFormRenderProps> = ({
  elements,
  defaultValues,
  onSubmit,
  schema,
}): ReactElement => {
  const methods = useForm({
    defaultValues,
    ...(schema && {
      resolver: zodResolver(schema),
    }),
  });

  const onReset = () => {
    methods.reset(defaultValues);
  };

  useEffect(() => {
    methods.reset(defaultValues);
  }, [methods, defaultValues]);

  return (
    <FormProvider {...methods}>
      {elements.map((element, index) => {
        const Component = ELEMENTS_CONFIG_MAP[element.type]
          .formComponent as ComponentType<typeof element.props>;

        return <Component key={index} {...element.props} />;
      })}

      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
