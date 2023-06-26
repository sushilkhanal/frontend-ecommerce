import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Item from "./pages/Item";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import Sidebar from "./components/sidebar";
import Electronics from "./pages/Electronics";
import Clothing from "./pages/Clothing";
import HomeAndKitchen from "./pages/HomeAndKitchen";
import Stationery from "./pages/Stationery";
import Toys from "./pages/Toys";
import Books from "./pages/Books";
import Wishlist from "./components/Wishlist";
import Checkout from "./pages/Checkout";
import { AuthContext } from "./AuthProvider";

function App(): JSX.Element {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState.token !== "";

  return (
    <ShoppingCartProvider>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {isLoggedIn && <Sidebar children={undefined} />}
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/item" element={<Item />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/clothing" element={<Clothing />} />
            <Route path="/homeandkitchen" element={<HomeAndKitchen />} />
            <Route path="/stationery" element={<Stationery />} />
            <Route path="/toys" element={<Toys />} />
            <Route path="/books" element={<Books />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
