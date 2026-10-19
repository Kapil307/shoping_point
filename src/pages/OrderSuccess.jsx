import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";
function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <section className="container py-5 text-center">
      <i className="bi bi-check-circle-fill display-1 text-success"></i>
      <h1 className="fw-bold mt-3">
        {order ? "Order placed successfully!" : "Order confirmation"}
      </h1>

      {order ? (
        <>
          <p className="text-secondary">
            Thank you for your purchase. Your order number is{" "}
            <strong>{order.orderId}</strong>.
          </p>
          <p className="fw-bold">
            Order total: ₹{order.total.toLocaleString("en-IN")}
          </p>
        </>
      ) : (
        <p className="text-secondary">
          Order details are unavailable. Please check your recent order
          confirmation.
        </p>
      )}

      <Link to="/" className="btn btn-success mt-3">
        Continue Shopping
      </Link>
    </section>
  );
}

export default OrderSuccess;
