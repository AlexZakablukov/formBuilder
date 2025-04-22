import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

export type TTextFieldProps = {
  type: 'textField';
  name: string;
  label?: string;
};

const TextFieldFormElement = ({
  name,
  label,
}: Omit<TTextFieldProps, 'type'>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          size="small"
          fullWidth
        />
      )}
    />
  );
};

export default TextFieldFormElement;
