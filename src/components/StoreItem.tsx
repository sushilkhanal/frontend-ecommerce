import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import FormatCurrency from "../utilities/FormatCurrency";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { useWishlist } from "../Context/WishlistContext";
import axios from "axios";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  url: string;
};

const StoreItem: React.FC<StoreItemProps> = ({ id, name, price, url }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const quantity = getItemQuantity(id);

  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemUrl, setItemUrl] = useState("");

  useEffect(() => {
    fetchItemData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await axios.get<StoreItemProps[]>(
        "http://localhost:8080/items"
      );
      const items = response.data;

      const item = items.find((item) => item.id === id);

      if (item) {
        setItemName(item.name);
        setItemPrice(item.price);
        setItemUrl(item.url);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching item data:", error);
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(id);
    alert("Item added to wishlist");
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(id);
    alert("Item removed from wishlist");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={itemUrl}
        height="400px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{itemName}</span>
          <span className="ms-2 text-muted">{FormatCurrency(itemPrice)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <div className="d-flex">
              <Button className="me-2" onClick={() => increaseCartQuantity(id)}>
                + Add To Cart
              </Button>
              {!wishlistItems.includes(id) && (
                <Button onClick={handleAddToWishlist}>Add To Wishlist</Button>
              )}
              {wishlistItems.includes(id) && (
                <Button onClick={handleRemoveFromWishlist}>
                  Remove From Wishlist
                </Button>
              )}
            </div>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in Cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
