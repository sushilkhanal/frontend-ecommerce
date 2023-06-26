import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

interface ProductData {
  name: string;
  price: string;
}

interface AddItemFormProps {
  show: boolean;
  handleClose: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ show, handleClose }) => {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    price: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/products",
        productData
      );
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemForm;
