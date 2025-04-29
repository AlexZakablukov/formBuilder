import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import { ReactElement } from 'react';
import FormRender from '../render/FormRender.tsx';
import { ELEMENTS_CONFIG_MAP } from '../elements';
import { TElement } from './types.ts';

const SidebarProperties = (): ReactElement | null => {
  const { selectedElementId, setSelectedElementId, elements, updateElement } =
    useFormBuilderContext();

  if (!selectedElementId) {
    return null;
  }

  const element = elements.get(selectedElementId);

  if (!element) {
    return null;
  }

  const { type, props } = element;

  const { elements: formElements, schema } =
    ELEMENTS_CONFIG_MAP[type].editableProps;

  const onSubmit = (values: TElement['props']) => {
    updateElement(selectedElementId, values);
    setSelectedElementId(null);
  };

  return (
    <FormRender
      elements={formElements}
      schema={schema}
      defaultValues={props as never}
      onSubmit={onSubmit}
    />
  );
};

export default SidebarProperties;
