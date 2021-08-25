import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: (productId: number, amount: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const product = await api.get(`/products/${productId}`);
      if (cart.find((p) => p.id === productId)) {
        const index = cart.findIndex((p) => p.id === productId);
        updateProductAmount(productId, cart[index].amount + 1);
      } else {
        product.data.amount = 1;
        setCart([...cart, product.data]);
        localStorage.setItem(
          "@RocketShoes:cart",
          JSON.stringify([...cart, product.data])
        );
      }
    } catch (error) {
      toast.error("Sem estoque");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const newCart = cart.filter((product) => product.id !== productId);
      setCart(newCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async (productId: number, amount: number) => {
    try {
      const productIndex = cart.findIndex(
        (product) => product.id === productId
      );

      const stock = await api.get<Stock>(`/stock/${productId}`);

      if (amount > stock.data.amount) {
        throw "Sem estoque";
      }

      const newCart = [...cart];
      newCart[productIndex].amount = amount;
      setCart(newCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Quantidade solicitada fora de estoque");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
