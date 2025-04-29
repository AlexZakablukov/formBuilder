import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  IconButton,
} from '@mui/material';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { ComponentType, FC, memo, ReactElement } from 'react';
import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import { ELEMENTS_CONFIG_MAP } from '../elements';

type TDesignerCardProps = {
  elementId: string;
} & CardProps;

const DesignerCard: FC<TDesignerCardProps> = ({
  elementId,
  ...rest
}): ReactElement | null => {
  const { elements } = useFormBuilderContext();

  const element = elements.get(elementId);

  if (!element) {
    return null;
  }

  const DesignerElementComponent = ELEMENTS_CONFIG_MAP[element.type]
    .component as ComponentType<typeof element.props>;

  return (
    <Card sx={styles.wrapper} data-id={elementId} {...rest}>
      <CardHeader
        title={`<${element.type}> - ${element.id} - ${Math.random()}`}
        action={
          <>
            <IconButton data-action="edit" children={<EditRounded />} />
            <IconButton
              color="error"
              data-action="delete"
              children={<DeleteRounded />}
            />
          </>
        }
        sx={styles.header}
        slotProps={{
          title: {
            variant: 'subtitle',
          },
        }}
      />
      <CardContent sx={styles.content}>
        <DesignerElementComponent {...element.props} />
      </CardContent>
    </Card>
  );
};

const styles = {
  wrapper: { height: '120px' },
  header: { borderBottom: '1px solid', borderColor: 'lightgrey', p: '8px' },
  content: { p: '8px !important', pointerEvents: 'none' },
};

export default memo(DesignerCard, (prev, next) => {
  return prev.elementId === next.elementId;
});
