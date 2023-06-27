import React, { createContext, useContext, useState } from "react";

type WishlistContextType = {
  wishlistItems: number[];
  addToWishlist: (itemId: number) => void;
  removeFromWishlist: (itemId: number) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToWishlist: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFromWishlist: () => {},
});

export const useWishlist = () => useContext(WishlistContext);

type WishlistProviderProps = {
  children: React.ReactNode;
};

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  const addToWishlist = (itemId: number) => {
    if (!wishlistItems.includes(itemId)) {
      setWishlistItems([...wishlistItems, itemId]);
    }
  };

  const removeFromWishlist = (itemId: number) => {
    const updatedItems = wishlistItems.filter((id) => id !== itemId);
    setWishlistItems(updatedItems);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
