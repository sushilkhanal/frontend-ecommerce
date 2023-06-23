import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import CartItem from "./CartItem";
import FormatCurrency from "../utilities/FormatCurrency";
import axios from "axios";

type StoreItem = {
  id: number;
  name: string;
  price: number;
  url: string;
};

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = React.useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      const response = await axios.get<StoreItem[]>(
        "http://localhost:8080/items"
      );
      const items = response.data;
      setStoreItems(items);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching store items:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            const storeItem = storeItems.find((i) => i.id === item.id);
            return storeItem ? (
              <CartItem
                key={storeItem.id}
                id={storeItem.id}
                name={storeItem.name}
                price={storeItem.price}
                url={storeItem.url}
                quantity={item.quantity}
              />
            ) : null;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {FormatCurrency(
              cartItems.reduce((total, cartItem) => {
                const storeItem = storeItems.find((i) => i.id === cartItem.id);
                return total + (storeItem?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
