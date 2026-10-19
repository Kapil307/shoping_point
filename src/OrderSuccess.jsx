
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <section className="container py-5 text-center">
        <h2>No order details found</h2>
        <Link to="/" className="btn btn-success mt-3">
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5 text-center">
      <i className="bi bi-check-circle-fill text-success display-1"></i>

      <h1 className="fw-bold mt-3">Order Placed Successfully!</h1>

      <p className="text-secondary">
        Thank you, {order.customer.name}. Your demo order has been created.
      </p>

      <div className="card border-0 shadow-sm mx-auto my-4 text-start"
        style={{ maxWidth: "450px" }}>
        <div className="card-body p-4">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Items:</strong> {order.items.reduce(
              (sum, item) => sum + (item.quantity || 1), 0
            )}
          </p>
          <h5 className="text-success">
            Total: ₹{order.total.toLocaleString("en-IN")}
          </h5>
          <p className="mb-0">
            <strong>Payment:</strong>{" "}
            {order.customer.payment === "cod"
              ? "Cash on Delivery"
              : "Online Payment (Demo)"}
          </p>
        </div>
      </div>

      <Link to="/" className="btn btn-success">
        Continue Shopping
      </Link>
    </section>
  );
}

export default OrderSuccess;
