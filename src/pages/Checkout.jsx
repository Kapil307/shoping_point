
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cart = [], onPlaceOrder }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "cod",
  });

  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty. Add products before checkout.");
      return;
    }

    const order = {
      orderId: `SE${Date.now()}`,
      customer: form,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    if (onPlaceOrder) {
      onPlaceOrder(order);
    }

    navigate("/order-success", {
      state: { order },
    });
  }

  if (cart.length === 0) {
    return (
      <section className="container py-5 text-center">
        <i className="bi bi-cart-x display-1 text-secondary"></i>
        <h2 className="mt-3">Your cart is empty</h2>
        <p className="text-secondary">
          Add some products before proceeding to checkout.
        </p>
        <Link to="/" className="btn btn-success">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="fw-bold mb-2">Checkout</h1>
      <p className="text-secondary mb-4">
        Complete your delivery details to place your order.
      </p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Customer Details */}
          <div className="col-lg-7">
            <div className="card checkout-card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <i className="bi bi-person-circle me-2"></i>
                  Customer Details
                </h4>

                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="phone">
                      Mobile Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="fw-bold mb-4">
                  <i className="bi bi-geo-alt me-2"></i>
                  Delivery Address
                </h4>

                <div className="mb-3">
                  <label className="form-label" htmlFor="address">
                    House No. and Street
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    rows="3"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      className="form-control"
                      value={form.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="state">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      className="form-control"
                      value={form.state}
                      onChange={handleChange}
                      autoComplete="address-level1"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="pincode">
                      PIN Code
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      value={form.pincode}
                      onChange={handleChange}
                      pattern="[1-9][0-9]{5}"
                      maxLength={6}
                      autoComplete="postal-code"
                      placeholder="6-digit PIN code"
                      required
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="fw-bold mb-3">
                  <i className="bi bi-credit-card me-2"></i>
                  Payment Method
                </h4>

                <label className="checkout-payment-option mb-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={handleChange}
                  />
                  <span className="ms-2">
                    <strong>Cash on Delivery</strong>
                    <small className="d-block text-secondary">
                      Pay when your order arrives
                    </small>
                  </span>
                </label>

                <label className="checkout-payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={form.payment === "online"}
                    onChange={handleChange}
                  />
                  <span className="ms-2">
                    <strong>Online Payment (Demo)</strong>
                    <small className="d-block text-secondary">
                      No real payment will be processed
                    </small>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5">
            <div className="card checkout-card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                {cart.map((item) => (
                  <div
                    className="d-flex gap-3 mb-3"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-product-image"
                    />

                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-secondary">
                        Quantity: {item.quantity || 1}
                      </small>
                    </div>

                    <strong>
                      ₹{(
                        item.price * (item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <span>Items ({totalItems})</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <h5 className="fw-bold">Total Amount</h5>
                  <h5 className="fw-bold text-success">
                    ₹{total.toLocaleString("en-IN")}
                  </h5>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg w-100 fw-bold"
                >
                  Place Order
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>

                <p className="text-secondary small text-center mt-3 mb-0">
                  <i className="bi bi-shield-check me-1"></i>
                  Demo checkout — no actual payment is taken.
                </p>

                <Link
                  to="/cart"
                  className="btn btn-outline-secondary w-100 mt-3"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
