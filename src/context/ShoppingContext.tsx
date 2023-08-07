import { ReactNode, createContext, useReducer, useContext } from "react";

type ShoppingCartReducerActions =
  | { type: "increaseQuantity"; id: number }
  | { type: "decreaseQuantity"; id: number }
  | { type: "removeFromCart"; id: number };

type Dispatch = (action: ShoppingCartReducerActions) => void;
export type CartItem = { id: number; quantity: number };
export type ShoppingCartState = Array<CartItem>;

type ProviderProps = {
  children: ReactNode;
  initState?: ShoppingCartState;
};

const ShoppingCartContext = createContext<
  { state: ShoppingCartState; dispatch: Dispatch } | undefined
>(undefined);

function shoppingCartReducer(
  state: ShoppingCartState,
  action: ShoppingCartReducerActions
) {
  /**
   * React strict mode looks for impurity in the code
   * This is considered impure because copying an object like this
   * shares the same references in memory as state and in reducers
   * mutating state directly is a no-go, need to dereference the copy to properly run
   * switch with the following line to see the double render go away
   *
   * const stateCopy = JSON.parse(JSON.stringify(state)) as ShoppingCartState;
   *
   */
  // const stateCopy = [...state];
  const stateCopy = JSON.parse(JSON.stringify(state)) as ShoppingCartState;

  let itemIdx: number | undefined = undefined;
  let item: CartItem | undefined = undefined;
  for (const [idx, value] of stateCopy.entries()) {
    if (action.id === value.id) {
      itemIdx = idx;
      item = value;
      break;
    }
  }

  // if item is not in current CarouselItem, add and set init index
  if (!item) {
    stateCopy.push({
      id: action.id,
      quantity: 0,
    });
  }
  if (itemIdx === undefined) {
    itemIdx = state.length === 0 ? 0 : state.length - 1;
  }

  switch (action.type) {
    case "increaseQuantity": {
      stateCopy[itemIdx].quantity = stateCopy[itemIdx].quantity + 1;
      return stateCopy;
    }
    case "decreaseQuantity": {
      stateCopy[itemIdx].quantity = stateCopy[itemIdx].quantity - 1;

      if (stateCopy[itemIdx].quantity < 0) {
        stateCopy[itemIdx].quantity = 0;
      }
      return stateCopy;
    }
    case "removeFromCart": {
      stateCopy.splice(itemIdx, 1);
      return stateCopy;
    }
  }
}

function ShoppingCartProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(shoppingCartReducer, []);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { ShoppingCartProvider, useShoppingCart };
