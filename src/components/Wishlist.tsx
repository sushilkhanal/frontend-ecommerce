import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoreItem from "./StoreItem";
import { useWishlist } from "../Context/WishlistContext";

const Wishlist: React.FC = () => {
  const { wishlistItems } = useWishlist();

  // // const handleAddToWishlist = (itemId: number) => {
  // //   alert("Item added to wishlist");
  // };

  return (
    <Container>
      <h1 className="mb-4">Wishlist</h1>
      <Row>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((itemId) => (
            <Col key={itemId} xs={12} md={6} lg={4} xl={3} className="mb-4">
              <StoreItem id={itemId} />
            </Col>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </Row>
    </Container>
  );
};

export default Wishlist;
