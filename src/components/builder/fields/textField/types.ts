import { TFormElementInstance } from '../../FormElements.tsx';
import { extraAttributes } from './consts.ts';

export type TExtraAttributes = typeof extraAttributes;

export type TCustomFormElementInstance = TFormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
