import "./ProductCard.css";
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <img
        src={product.image}
        className="card-img-top product-image"
        alt={product.name}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>

        <p className="text-secondary small">{product.category}</p>

        <div className="mt-auto">
          <h5 className="text-success fw-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </h5>

          <button
            className="btn btn-success w-100 mt-2"
            onClick={() => onAddToCart(product)}
          >
            <i className="bi bi-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
