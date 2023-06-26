import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useShoppingCart } from "../Context/ShoppingCartContext";

import { LocationState } from "path/to/LocationState";

const LoginForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation<LocationState>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(location.state?.message);
  const { setCartItems } = useShoppingCart();

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value: string): void => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          userName: username,
          password: password,
        }
      );

      if (response.status === 200) {
        const { authorization, username, userId, role } = response.data;

        // Save the token and username in local storage
        localStorage.setItem("token", authorization);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);

        // Perform any necessary actions upon successful login
        alert("Login successful");

        // Reset form fields and error message
        setUsername("");
        setPassword("");
        setErrorMessage("");

        // Fetch the user's cart data from the server
        axios
          .get(`http://localhost:8080/carts/${userId}`)
          .then((response) => {
            const cartData = response.data;

            // Update the shopping cart state with the cart data from the server
            setCartItems(
              cartData.items.map((item: any) => ({
                id: item.itemId,
                quantity: item.quantity,
              }))
            );
          })
          .catch((error) => {
            console.log("Error fetching cart data:", error);
          });
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        // Redirect to the Items page and reload after a small delay
        // navigate("/item");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <MDBContainer
      className="p-3 my-5 d-flex flex-column"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between a"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-outline mb-4">
              <MDBInput
                label="Username"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <MDBInput
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <MDBCheckbox label="Remember me" />
              </div>

              <div className="col text-end">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                Not a member? <a href="#!">Register</a>
              </p>
            </div>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default LoginForm;
