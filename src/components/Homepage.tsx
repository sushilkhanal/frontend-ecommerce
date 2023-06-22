import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { Button } from "react-bootstrap";

function Homepage() {
  const [items, setItems] = useState([]);
  const { increaseCartQuantity } = useShoppingCart();

  useEffect(() => {
    axios
      .get("http://localhost:8080/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddToCart = (id) => {
    increaseCartQuantity(id);
  };

  return (
    <div className="container">
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card">
              <img src={item.url} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(item.id)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
