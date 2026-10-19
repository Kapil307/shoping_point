
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Fashion from "./pages/Fashion";
import Accessories from "./pages/Accessories";
import Phones from "./pages/Phones";
import HomeProducts from "./pages/HomeProducts";
import Beauty from "./pages/Beauty";
import Sports from "./pages/Sports";
import OrderSuccess from "./pages/OrderSuccess";
import Electronics from "./pages/Electronics";

function App() {
  const [cart, setCart] = useState([]);

  function handlePlaceOrder() {
    setCart([]);
  }

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        if (existing.quantity >= (existing.stock ?? 99)) {
          return currentCart;
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function handleRemoveFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function handleUpdateQuantity(productId, quantity) {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity: Math.min(quantity, item.stock ?? 99),
          }
          : item
      )
    );
  }

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cart.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
      />

      <Routes>
        <Route
          path="/"
          element={<Home onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/fashion"
          element={<Fashion onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/electronics"
          element={<Electronics onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/accessories"
          element={<Accessories onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/phones"
          element={<Phones onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/home-living"
          element={<HomeProducts onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/beauty"
          element={<Beauty onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/sports"
          element={<Sports onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onPlaceOrder={handlePlaceOrder}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
