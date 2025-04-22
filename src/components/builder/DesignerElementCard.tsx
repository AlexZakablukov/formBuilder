import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  IconButton,
} from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import { formElements, TFormElementInstance } from './FormElements.tsx';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';

type TDesignerElementCardProps = {
  elementInstance: TFormElementInstance;
} & Partial<CardProps>;

const DesignerElementCard = ({
  elementInstance,
  ...rest
}: TDesignerElementCardProps) => {
  const DesignerElement = formElements[elementInstance.type].designerComponent;
  const { icon: Icon, label } = formElements[elementInstance.type];

  const { removeElement, setSelectedElement } = useFormBuilderContext();

  return (
    <Card
      onClick={(event) => {
        event.stopPropagation();
        setSelectedElement(elementInstance);
      }}
      {...rest}
    >
      <CardHeader
        avatar={<Icon />}
        title={label}
        action={
          <IconButton
            color="error"
            onClick={(event) => {
              event.stopPropagation();
              removeElement(elementInstance.id);
            }}
            children={<DeleteRounded />}
          />
        }
        sx={{ borderBottom: '1px solid', borderColor: 'lightgrey', p: '8px' }}
        slotProps={{
          title: {
            variant: 'subtitle',
          },
        }}
      />
      <CardContent sx={{ p: '8px !important', pointerEvents: 'none' }}>
        <DesignerElement elementInstance={elementInstance} />
      </CardContent>
    </Card>
  );
};

export default DesignerElementCard;
