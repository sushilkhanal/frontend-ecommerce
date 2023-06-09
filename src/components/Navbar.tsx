import React, { useContext } from "react";
import {
  Navbar as BootNav,
  Button,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { AuthContext } from "../AuthProvider";

function Navbar() {
  const navigate = useNavigate();
  const { openCart, cartQuantity } = useShoppingCart();
  const { authState, setAuthState } = useContext(AuthContext);
  const isLoggedIn = authState.token !== "";

  const handleLogout = () => {
    setAuthState({ token: "", username: "", userId: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
    alert("Logout successful");
  };

  return (
    <BootNav sticky="top" className="bg-white shadow-sm mb-3">
      <Container className="d-flex justify-content-between align-items-center">
        <Nav className="mr-auto">
          <Nav.Link to={"/"} as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to={"/item"} as={NavLink}>
            Item
          </Nav.Link>
          <NavDropdown
            title={isLoggedIn ? authState.username : "Account"}
            id="account-dropdown"
          >
            {!isLoggedIn && (
              <NavDropdown.Item to={"/login"} as={NavLink}>
                Login
              </NavDropdown.Item>
            )}
            {isLoggedIn && (
              <>
                <NavDropdown.Item to={"/wishlist"} as={NavLink}>
                  Wishlist
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              ></path>
            </svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.2rem",
                height: "1.2rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(40%, 40%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </BootNav>
  );
}

export default Navbar;
