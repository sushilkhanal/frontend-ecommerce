import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import FormatCurrency from "../utilities/FormatCurrency";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import axios from "axios";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  url: string;
};

function StoreItem({ id, name, price, url }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItemData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      // Assuming the response data is an array of items
      // You may need to adjust the data structure based on your backend response
      const items = response.data;

      // Find the item with the matching ID
      const item = items.find((item: StoreItemProps) => item.id === id);

      // Update the item data
      if (item) {
        setName(item.name);
        setPrice(item.price);
        setUrl(item.url);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching item data:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={url}
        height="400px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{FormatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
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
}

export default StoreItem;
