import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface SelectedCartItemsContextValue {
  selectedCartItems: CartItem[];
  setSelectedCartItems: (cartItem: CartItem[]) => void;
}

export const SelectedCartItemsContext =
  createContext<SelectedCartItemsContextValue>(
    {} as SelectedCartItemsContextValue
  );

export const useSelectedCartItems = () => {
  const context = useContext(SelectedCartItemsContext);
  if (!context) {
    throw new Error(
      'useSelectedCartItems must be used within a SelectedCartItemsProvider'
    );
  }
  return context;
};

export const SelectedCartItemsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  return (
    <SelectedCartItemsContext.Provider
      value={{ selectedCartItems, setSelectedCartItems }}
    >
      {children}
    </SelectedCartItemsContext.Provider>
  );
};
