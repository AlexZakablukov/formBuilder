import { ELEMENTS_CONFIG_MAP } from '../elements';
import { ComponentProps } from 'react';

export type TElement = {
  [K in keyof typeof ELEMENTS_CONFIG_MAP]: {
    id: string;
    type: K;
    props: ComponentProps<(typeof ELEMENTS_CONFIG_MAP)[K]['component']>;
  };
}[keyof typeof ELEMENTS_CONFIG_MAP];

export type TElementsType = keyof typeof ELEMENTS_CONFIG_MAP;
