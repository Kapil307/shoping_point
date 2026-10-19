import "./CartPage.css";
import { Link } from "react-router-dom";

function Cart({ cart = [], onRemoveFromCart, onUpdateQuantity }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Shopping Cart</h1>
        <Link to="/" className="btn btn-outline-success">
          <i className="bi bi-arrow-left me-2"></i>
          Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-secondary"></i>
          <h3 className="mt-3">Your cart is empty</h3>
          <p className="text-secondary">
            Add some products to your cart to get started.
          </p>
          <Link to="/" className="btn btn-success mt-2">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div
                className="card mb-3 border-0 shadow-sm"
                key={item.id}
              >
                <div className="card-body">
                  <div className="row align-items-center g-3">
                    <div className="col-4 col-md-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded cart-product-image"
                      />
                    </div>

                    <div className="col-8 col-md-9">
                      <div className="d-flex justify-content-between gap-2">
                        <div>
                          <h5 className="fw-bold">{item.name}</h5>
                          <p className="text-secondary mb-1">
                            {item.category}
                          </p>
                          <p className="fw-bold text-success mb-2">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <button
                          className="btn btn-outline-danger btn-sm align-self-start"
                          onClick={() => onRemoveFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          title="Remove product"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>

                      <div className="d-flex align-items-center gap-3 mt-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              (item.quantity || 1) - 1
                            )
                          }
                          disabled={(item.quantity || 1) <= 1}
                          aria-label="Decrease quantity"
                        >
                          <i className="bi bi-dash"></i>
                        </button>

                        <span className="fw-bold">
                          {item.quantity || 1}
                        </span>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              (item.quantity || 1) + 1
                            )
                          }
                          disabled={
                            (item.quantity || 1) >= (item.stock ?? 99)
                          }
                          aria-label="Increase quantity"
                        >
                          <i className="bi bi-plus"></i>
                        </button>

                        <span className="ms-auto fw-bold">
                          ₹{(
                            item.price * (item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">
                    Items ({totalItems})
                  </span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Shipping</span>
                  <span className="text-success">Free</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <h5 className="fw-bold">Total</h5>
                  <h5 className="fw-bold text-success">
                    ₹{total.toLocaleString("en-IN")}
                  </h5>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-warning btn-lg w-100"
                >
                  Proceed to Checkout
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>

                <p className="text-secondary small text-center mt-3 mb-0">
                  Shipping charges are free for this demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
