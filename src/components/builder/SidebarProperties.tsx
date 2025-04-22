import { useFormBuilderContext } from './context/FormBuilderContext.tsx';
import { formElements } from './FormElements.tsx';

const SidebarProperties = () => {
  const { selectedElement } = useFormBuilderContext();

  if (!selectedElement) {
    return null;
  }

  const PropertiesComponent =
    formElements[selectedElement.type].propertiesComponent;

  return <PropertiesComponent elementInstance={selectedElement} />;
};

export default SidebarProperties;
