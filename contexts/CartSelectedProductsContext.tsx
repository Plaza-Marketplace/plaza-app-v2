import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from 'react';

type CartAction =
  | { type: 'ADD_ITEM'; id: Id; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: Id };

interface SelectedCartItemsContextValue {
  selectedCartItems: Record<Id, CartItem>;
  dispatchSelectedCartItems: (action: CartAction) => void;
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

const action = (
  state: Record<Id, CartItem>,
  action: CartAction
): Record<Id, CartItem> => {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (state[action.id]) {
        const newState = { ...state };
        newState[action.id].quantity += 1;
        return newState;
      }
      action.item.quantity = 1;
      return { ...state, [action.id]: action.item };
    }
    case 'REMOVE_ITEM': {
      const newState = { ...state };
      if (!newState[action.id]) return newState;

      if (newState[action.id].quantity - 1 == 0) {
        delete newState[action.id];
        return newState;
      } else {
        newState[action.id].quantity -= 1;
      }
      return newState;
    }
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export const SelectedCartItemsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedCartItems, dispatchSelectedCartItems] = useReducer(action, {});

  return (
    <SelectedCartItemsContext.Provider
      value={{ selectedCartItems, dispatchSelectedCartItems }}
    >
      {children}
    </SelectedCartItemsContext.Provider>
  );
};
