import { Card, CardContent, CardHeader, CardProps } from '@mui/material';
import { ComponentType, FC, ReactElement } from 'react';
import { TElementsType } from './types.ts';
import { ELEMENTS_CONFIG_MAP } from '../elements';

type TSidebarCardProps = { type: TElementsType } & CardProps;

const SidebarCard: FC<TSidebarCardProps> = ({
  type,
  ...props
}): ReactElement => {
  const componentProps = ELEMENTS_CONFIG_MAP[type].initialProps;
  const Component = ELEMENTS_CONFIG_MAP[type].component as ComponentType<
    typeof componentProps
  >;

  return (
    <Card sx={styles.wrapper} {...props}>
      <CardHeader sx={styles.header} title={`<${type}>`} />
      <CardContent sx={styles.content}>
        <Component {...componentProps} />
      </CardContent>
    </Card>
  );
};

const styles = {
  wrapper: {
    cursor: 'grab',
    height: '120px',
    userSelect: 'none',
  },
  header: {
    borderBottom: '1px solid',
    borderColor: 'lightgrey',
    padding: '8px',
  },
  content: {
    pointerEvents: 'none',
    padding: '8px !important',
  },
};

export default SidebarCard;
