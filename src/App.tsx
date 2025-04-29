import { Box, CssBaseline } from '@mui/material';
import FormBuilder from './components/builder/FormBuilder.tsx';

function App() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <FormBuilder />
      {/*<FormRender*/}
      {/*  onSubmit={(values) => {*/}
      {/*    console.log({ values });*/}
      {/*  }}*/}
      {/*  defaultValues={{*/}
      {/*    'textField-name': '',*/}
      {/*    'switch-name': false,*/}
      {/*  }}*/}
      {/*  schema={z.object({*/}
      {/*    'textField-name': z.string().min(1, 'Required'),*/}
      {/*    'switch-name': z.boolean(),*/}
      {/*  })}*/}
      {/*  elements={[*/}
      {/*    {*/}
      {/*      type: 'textField',*/}
      {/*      props: {*/}
      {/*        name: 'textField-name',*/}
      {/*        label: 'Text Field',*/}
      {/*        required: true,*/}
      {/*      },*/}
      {/*    },*/}
      {/*    {*/}
      {/*      type: 'switch',*/}
      {/*      props: {*/}
      {/*        name: 'switch-name',*/}
      {/*        label: 'Switch',*/}
      {/*      },*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </Box>
  );
}

export default App;
