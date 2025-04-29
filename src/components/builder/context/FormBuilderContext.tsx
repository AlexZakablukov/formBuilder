import { TElement, TElementsType } from '../types.ts';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ELEMENTS_CONFIG_MAP } from '../../elements';

type TFormBuilderContextState = {
  elements: Map<string, TElement>;
  elementsIds: string[];
  selectedElementId: string | null;
  addElement: (type: TElementsType, index?: number) => void;
  changeElementPosition: (id: string, newIndex: number) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, newProps: TElement['props']) => void;
  setSelectedElementId: (id: string | null) => void;
};

const FormBuilderContext = createContext<TFormBuilderContextState>({
  elements: new Map(),
  elementsIds: [],
  addElement: () => {},
  changeElementPosition: () => {},
  removeElement: () => {},
  updateElement: () => {},
  selectedElementId: null,
  setSelectedElementId: () => {},
});

export const useFormBuilderContext = () => {
  const context = useContext(FormBuilderContext);

  if (!context) {
    throw new Error(
      'useFormBuilderContext must be used within a FormBuilderContextProvider',
    );
  }

  return context;
};

const FormBuilderContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const elementsRef = useRef(new Map<string, TElement>());
  const [elementsIds, setElementsIds] = useState<string[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );

  const addElement = (type: TElementsType, index?: number) => {
    const element = {
      id: uuidv4(),
      type,
      props: ELEMENTS_CONFIG_MAP[type].initialProps,
    } as TElement;

    elementsRef.current.set(element.id, element);

    if (index === undefined) {
      setElementsIds((prevState) => [...prevState, element.id]);
    } else {
      const updatedElementsIds = [...elementsIds];
      updatedElementsIds.splice(index, 0, element.id);
      setElementsIds(updatedElementsIds);
    }

    setSelectedElementId(element.id);
  };

  const changeElementPosition = (id: string, newIndex: number) => {
    const currentIndex = elementsIds.findIndex((el) => el === id);
    if (currentIndex === -1) {
      return;
    }

    const updatedElementsIds = [...elementsIds];
    updatedElementsIds.splice(currentIndex, 1);
    updatedElementsIds.splice(
      currentIndex < newIndex ? newIndex - 1 : newIndex,
      0,
      id,
    );

    setElementsIds(updatedElementsIds);
  };

  const removeElement = (id: string) => {
    elementsRef.current.delete(id);
    setElementsIds((prevState) => prevState.filter((el) => el !== id));
    if (id === selectedElementId) {
      setSelectedElementId(null);
    }
  };

  const updateElement = (id: string, newProps: TElement['props']) => {
    const element = elementsRef.current.get(id);

    if (!element) {
      return;
    }

    const updatedElement = {
      ...element,
      props: {
        ...element.props,
        ...newProps,
      },
    } as TElement;

    elementsRef.current.set(id, updatedElement);
  };

  return (
    <FormBuilderContext.Provider
      value={{
        elements: elementsRef.current,
        elementsIds,
        selectedElementId,
        setSelectedElementId,
        addElement,
        changeElementPosition,
        removeElement,
        updateElement,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export default FormBuilderContextProvider;
