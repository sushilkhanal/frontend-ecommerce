import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import axios from "axios";
import { Button, Stack } from "react-bootstrap";
import FormatCurrency from "../utilities/FormatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

type Item = {
  id: number;
  url: string;
  name: string;
  price: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItemData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await axios.get<Item>(
        `http://localhost:8080/items/${id}` // Update the endpoint to fetch item data
      );
      const itemData = response.data;
      setItem(itemData);
    } catch (error) {
      console.log("Error fetching item data:", error);
    }
  };

  if (!item) {
    return null;
  }

  const totalItemPrice = item.price * quantity;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-item-center">
      <img
        src={item.url}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {""}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              {quantity}x
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {FormatCurrency(item.price)}
        </div>
      </div>
      <div>{FormatCurrency(totalItemPrice)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

export default CartItem;
