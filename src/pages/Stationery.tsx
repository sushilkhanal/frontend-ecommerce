import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

type Item = {
  id: number;
  url: string;
  name: string;
  price: number;
  category: string;
};

function Stationery() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios
      .get<Item[]>("http://localhost:8080/items")
      .then((response) => {
        const stationeryItems = response.data.filter((item) => {
          return item.category === "Stationery";
        });
        setItems(stationeryItems);
        console.log(stationeryItems);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1>Stationery</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <StoreItem
              id={item.id}
              name={item.name}
              price={item.price}
              url={item.url}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Stationery;
