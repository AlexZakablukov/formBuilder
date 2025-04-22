import { TFormElementInstance } from '../FormElements.tsx';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type TDesignerContext = {
  elements: TFormElementInstance[];
  addElement: (index: number, element: TFormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: TFormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<TFormElementInstance | null>>;
  updateElement: (id: string, element: TFormElementInstance) => void;
};

export const FormBuilderContext = createContext<TDesignerContext | null>(null);

export const useFormBuilderContext = () => {
  const context = useContext(FormBuilderContext);

  if (!context) {
    throw new Error(
      'useDesignerContext must be used within a DesignerContextProvider',
    );
  }

  return context;
};

const FormBuilderContextProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<TFormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<TFormElementInstance | null>(null);

  const addElement = (index: number, element: TFormElementInstance) => {
    setElements((prevElements) => {
      const newElements = [...prevElements];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prevState) =>
      prevState.filter((element) => element.id !== id),
    );
  };

  const updateElement = (id: string, element: TFormElementInstance) => {
    setElements((prevState) =>
      prevState.map((el) => (el.id === id ? element : el)),
    );
  };

  return (
    <FormBuilderContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export default FormBuilderContextProvider;
