import { ReactNode, createContext, useContext } from "react";
type ProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};
type CartItem = {
  id: number;
  quantity: number;
};
const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem>([]);
  return <ShoppingCartProvider value={{}}>{children}</ShoppingCartProvider>;
}
