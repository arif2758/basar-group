// src/context/BookCartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import {
  IBook,
  IBookCartItem,
  BorrowDuration,
  DeliveryMethod,
} from "@/data/granthagar/types";

interface BookCartContextType {
  items: IBookCartItem[];
  cartMap: Record<string, IBookCartItem>;
  totalItems: number;
  durationDays: BorrowDuration;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  bookBorrowFee: number;
  totalAmount: number;
  addToCart: (book: IBook, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  setDurationDays: (days: BorrowDuration) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
}

const BookCartContext = createContext<BookCartContextType | undefined>(undefined);

const STORAGE_KEY = "basar_granthagar_cart_v1";

export const BookCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // O(1) Hash Map state keyed by productId
  const [cartMap, setCartMap] = useState<Record<string, IBookCartItem>>({});
  const [durationDays, setDurationDays] = useState<BorrowDuration>(3);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("self_pickup");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setCartMap(parsed.cartMap || {});
          if (parsed.durationDays) setDurationDays(parsed.durationDays);
          if (parsed.deliveryMethod) setDeliveryMethod(parsed.deliveryMethod);
        }
      }
    } catch (e) {
      console.error("Failed to load library cart from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cartMap,
          durationDays,
          deliveryMethod,
        })
      );
    } catch (e) {
      console.error("Failed to save library cart to storage", e);
    }
  }, [cartMap, durationDays, deliveryMethod, isLoaded]);

  // Fast O(1) Lookups
  const isInCart = useCallback(
    (productId: string) => {
      return Boolean(cartMap[productId]);
    },
    [cartMap]
  );

  const getItemQuantity = useCallback(
    (productId: string) => {
      return cartMap[productId]?.quantity || 0;
    },
    [cartMap]
  );

  // Cart operations
  const addToCart = useCallback((book: IBook, quantity = 1) => {
    if (book.availableQuantity <= 0 || book.status === "borrowed") {
      toast.error("বইটি বর্তমানে লাইব্রেরিতে উপলব্ধ নেই!");
      return;
    }

    setCartMap((prev) => {
      const current = prev[book.productId];
      const newQty = (current?.quantity || 0) + quantity;
      const cappedQty = Math.min(newQty, book.availableQuantity || 1);

      return {
        ...prev,
        [book.productId]: {
          book,
          quantity: cappedQty,
        },
      };
    });

    toast.success(`"${book.title}" added to cart!`);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartMap((prev) => {
      if (!prev[productId]) return prev;

      if (quantity <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }

      const book = prev[productId].book;
      const cappedQty = Math.min(quantity, book.availableQuantity || 1);

      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: cappedQty,
        },
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartMap((prev) => {
      if (!prev[productId]) return prev;
      const next = { ...prev };
      const title = next[productId].book.title;
      delete next[productId];
      toast.info(`"${title}" removed from cart`);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartMap({});
  }, []);

  // Memoized derived properties
  const items = useMemo(() => Object.values(cartMap), [cartMap]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Fee calculation: Self Pickup = 0 Tk, Delivery = 10 Tk
  const deliveryFee = useMemo(() => {
    if (deliveryMethod === "self_pickup" || totalItems === 0) return 0;
    return 10;
  }, [deliveryMethod, totalItems]);

  const bookBorrowFee = 0; // Completely free reader service
  const totalAmount = deliveryFee + bookBorrowFee;

  const value = useMemo(
    () => ({
      items,
      cartMap,
      totalItems,
      durationDays,
      deliveryMethod,
      deliveryFee,
      bookBorrowFee,
      totalAmount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      getItemQuantity,
      setDurationDays,
      setDeliveryMethod,
    }),
    [
      items,
      cartMap,
      totalItems,
      durationDays,
      deliveryMethod,
      deliveryFee,
      bookBorrowFee,
      totalAmount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      getItemQuantity,
      setDurationDays,
      setDeliveryMethod,
    ]
  );

  return (
    <BookCartContext.Provider value={value}>
      {children}
    </BookCartContext.Provider>
  );
};

export const useBookCart = () => {
  const context = useContext(BookCartContext);
  if (!context) {
    throw new Error("useBookCart must be used within a BookCartProvider");
  }
  return context;
};
