import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { FaHeart } from "react-icons/fa";

function Electronics() {
  const [items, setItems] = useState<Item[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  interface Item {
    id: string;
    name: string;
    category: string;
    url: string;
    price: number;
  }

  const fetchItems = async () => {
    try {
      const response = await axios.get<Item[]>("http://localhost:8080/items");
      const electronicItems = response.data.filter(
        (item) => item.category.toLowerCase() === "electronics"
      );
      setItems(electronicItems);
    } catch (error) {
      console.error("Error occurred while fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateCartItemCount = (count: number) => {
    setCartItemCount(count);
  };

  const handleAddToCart = async (itemId: string, quantity: number) => {
    if (authState && authState.username) {
      try {
        const userId = authState.userId;
        const url = `http://localhost:8080/carts/${userId}`;

        // Send a POST request to add the item to the cart
        const response = await axios.post(url, {
          itemId: itemId,
          quantity: quantity,
        });

        console.log(
          `${userId} is adding item with ID ${itemId} to cart with quantity ${quantity}`
        );
        console.log("Success");

        // Update the cart item count
        updateCartItemCount(cartItemCount + 1);

        // Navigate to the cart page
        // navigate("/");
      } catch (error) {
        console.error("Error occurred while adding item to cart:", error);
      }
    } else {
      // Navigate to the login page
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="row">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={item.url}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold" }}>
                    {item.name}
                  </h5>
                  <p className="card-text">${item.price}</p>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      min="1"
                      defaultValue="1"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        setQuantity(newQuantity);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(item.id, quantity)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-dark"
                      onClick={() => handleAddToCart(item.id, quantity)}
                    >
                      Add to Wishlist <FaHeart style={{ color: "red" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Electronics;
