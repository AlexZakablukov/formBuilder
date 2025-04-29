import { switchElementConfig } from './switchElement.tsx';
import { textFieldElementConfig } from './textFieldElement.tsx';

export const ELEMENTS_CONFIG_MAP = {
  [textFieldElementConfig.type]: textFieldElementConfig,
  [switchElementConfig.type]: switchElementConfig,
};
