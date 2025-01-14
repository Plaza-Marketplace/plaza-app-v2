import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface SelectedProductsContextValue {
  selectedProducts: Product[];
  setSelectedProducts: (products: Product[]) => void;
}

export const SelectedProductsContext =
  createContext<SelectedProductsContextValue>(
    {} as SelectedProductsContextValue
  );

export const useSelectedProducts = () => {
  const context = useContext(SelectedProductsContext);
  if (!context) {
    throw new Error(
      'useSelectedProducts must be used within a SelectedProductsProvider'
    );
  }
  return context;
};

export const SelectedProductsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  return (
    <SelectedProductsContext.Provider
      value={{ selectedProducts, setSelectedProducts }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
};
