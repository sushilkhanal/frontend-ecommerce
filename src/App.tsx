import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Item from "./pages/Item";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import Sidebar from "./components/sidebar";
import Homepage from "./components/Homepage";
import NewLogin from "./pages/NewLogin";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Sidebar>
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/item" element={<Item />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/newlogin" element={<NewLogin />} />
          </Routes>
        </Container>
      </Sidebar>
    </ShoppingCartProvider>
  );
}

export default App;
