import React, { useState, ChangeEvent, FormEvent } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

interface ItemData {
  name: string;
  price: string;
  quantity: string;
  url: string;
  category: string;
}

interface UserData {
  userName: string;
  email: string;
  password: string;
  role: string;
}

function Dashboard() {
  const [itemData, setItemData] = useState<ItemData>({
    name: "",
    price: "",
    quantity: "",
    url: "",
    category: "",
  });

  const [userData, setUserData] = useState<UserData>({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleItemInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddItemSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/items", itemData)
      .then((response) => {
        setSuccessMessage("Item added successfully");
        setItemData({
          name: "",
          price: "",
          quantity: "",
          url: "",
          category: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddUserSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/users", userData)
      .then((response) => {
        setSuccessMessage("User added successfully");
        setUserData({
          userName: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <Row className="mx-5 my-5">
        <Col className="mx-5">
          <Form onSubmit={handleAddItemSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={itemData.name}
                onChange={handleItemInputChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={itemData.price}
                onChange={handleItemInputChange}
                placeholder="Enter price"
                required
              />
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={itemData.quantity}
                onChange={handleItemInputChange}
                placeholder="Enter quantity"
                required
              />
            </Form.Group>
            <Form.Group controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={itemData.url}
                onChange={handleItemInputChange}
                placeholder="Enter URL"
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={itemData.category}
                onChange={handleItemInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Stationary">Stationary</option>
                <option value="Toys">Toys</option>
                <option value="Books">Books</option>
              </Form.Control>
            </Form.Group>
            <Button className="my-2" variant="primary" type="submit">
              Add Item
            </Button>
          </Form>
        </Col>

        <Col>
          <Form onSubmit={handleAddUserSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleUserInputChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUserInputChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUserInputChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={userData.role}
                onChange={handleUserInputChange}
                required
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Control>
            </Form.Group>
            <Button className="my-2" variant="primary" type="submit">
              Add User
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
